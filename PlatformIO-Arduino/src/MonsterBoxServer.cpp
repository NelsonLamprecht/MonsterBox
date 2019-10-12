#include "Arduino.h"
#include "avr/pgmspace.h"
#include "StensTimer.h"
#include "Bounce.h"
#include "MonsterBoxServer.h"

#define STOP 0
#define START 1
#define SHAKE 2

/* Implementation */
MonsterBoxServer::MonsterBoxServer(int outputPin_L, int outputPin_R) {
  _outputPin_L = outputPin_L;
  _outputPin_R = outputPin_R;
};

long MonsterBoxServer::getRepetitions() {
  Serial.print("MBS: GR: ");
  Serial.print(_repetitionLow);
  Serial.print(" - ");
  Serial.println(_repetitionHigh);
  return random(_repetitionLow, _repetitionHigh);
}

long MonsterBoxServer::getDelayTime() {
  Serial.print("MBS: GDT: ");
  Serial.print(_delayTimeLow);
  Serial.print(" - ");
  Serial.println(_delayTimeHigh);
  return random(_delayTimeLow, _delayTimeHigh);
}

void MonsterBoxServer::Init() {
  _stensTimer = StensTimer::getInstance();
  _bounceLeft = new Bounce(NAME_LEFT, _outputPin_L);
  _bounceRight = new Bounce(NAME_RIGHT, _outputPin_R);
  randomSeed(seedOut(32));
  pinMode(_outputPin_L, OUTPUT);
  pinMode(_outputPin_R, OUTPUT);
  digitalWrite(_outputPin_L, RELAY_OFF);
  digitalWrite(_outputPin_R, RELAY_OFF);
}

void MonsterBoxServer::Run() {
  _stensTimer->run();
}

void MonsterBoxServer::Start() {
  Serial.println("MBS: START: ");
  long _delayTime = getDelayTime();
  long _repetitions = getRepetitions();  
  _bounceLeft->SetDelayTime(_delayTime);
  _bounceRight->SetDelayTime(_delayTime);
  _bounceLeft->SetRepetitions(_repetitions);
  _bounceRight->SetRepetitions(_repetitions);
  _stensTimer->setTimer(_bounceLeft, START, 0);
  _stensTimer->setTimer(_bounceRight, START, 0);
}

void MonsterBoxServer::Stop() {
  Serial.println("MBS: STOP: ");
  _bounceLeft->Stop();
  _bounceRight->Stop();
}

void MonsterBoxServer::SetRepetitionLow(long low) {
  _repetitionLow = low;
  Serial.print("MBS: SRL: ");
  Serial.println(_repetitionLow);
}

void MonsterBoxServer::SetRepetitionHigh(long high) {
  _repetitionHigh = high;
  Serial.print("MBS: SRH: ");
  Serial.println(_repetitionHigh);
}

void MonsterBoxServer::SetDelayTimeLow(long low) {
  _delayTimeLow = low;
  Serial.print("MBS: SDL: ");
  Serial.println(_delayTimeLow);
}

void MonsterBoxServer::SetDelayTimeHigh(long high) {
  _delayTimeHigh = high;
  Serial.print("MBS: SDH: ");
  Serial.println(_delayTimeHigh);
}

unsigned long MonsterBoxServer::seedOut(unsigned int noOfBits) {
  // return value with 'noOfBits' random bits set
  unsigned long seed = 0, limit = 99;
  int bit0 = 0, bit1 = 0;
  while (noOfBits--)
  {
    for (int i = 0; i < limit; ++i)
    {
      bit0 = analogRead(0) & 1;
      bit1 = analogRead(0) & 1;
      if (bit1 != bit0)
        break;
    }
    seed = (seed << 1) | bit1;
  }
  return seed;
}
