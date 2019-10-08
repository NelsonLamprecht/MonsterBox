#ifndef MonsterBoxServer_h
#define MonsterBoxServer_h
#include "Arduino.h"
#include "StensTimer.h"
#include "Bounce.h"

class MonsterBoxServer {
  public:
    MonsterBoxServer(int outputPin_L, int outputPin_R);
    void Init(); 
    void Run();
    void Start();
    void Stop();    
    void SetRepetitionLow(long low);
    void SetRepetitionHigh(long high);
    void SetDelayTimeLow(long low);
    void SetDelayTimeHigh(long high);    
    enum CommandAction
    {
      STOP = 10,
      START = 20,
      SETDELAYTIMELOW = 30,
      SETDELAYTIMEHIGH = 31,      
      SETREPETITIONSLOW = 40,
      SETREPETITIONSHIGH = 41      
    };
    constexpr static char const *CMD_STOP PROGMEM = "STOP";
    constexpr static char const *CMD_START PROGMEM = "START";
    constexpr static char const *CMD_SETDELAYTIMELOW PROGMEM = "SETDELAYTIMELOW";
    constexpr static char const *CMD_SETDELAYTIMEHIGH PROGMEM = "SETDELAYTIMEHIGH";
    constexpr static char const *CMD_SETREPETITIONSLOW PROGMEM = "SETREPETITIONSLOW";
    constexpr static char const *CMD_SETREPETITIONSHIGH PROGMEM = "SETREPETITIONSHIGH";   
    constexpr static char const *NAME_LEFT = "LEFT";
    constexpr static char const *NAME_RIGHT = "RIGHT";
  private:
    const int RELAY_ON = 0;
    const int RELAY_OFF = 1;
    long _repetitionLow = 5L;
    long _repetitionHigh = 10L;
    long _delayTimeLow = 50L;
    long _delayTimeHigh = 200L;
    int _outputPin_L;
    int _outputPin_R;
    StensTimer *_stensTimer = NULL;
    Bounce *_bounceLeft = NULL;
    Bounce *_bounceRight = NULL;
    long getRepetitions();
    long getDelayTime();
    unsigned long seedOut(unsigned int noOfBits);
    bool shake();    
};
#endif