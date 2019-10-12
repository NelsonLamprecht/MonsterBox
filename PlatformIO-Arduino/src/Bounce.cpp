/*
Copyright (C) 2019 Nelson Lamprecht

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

#include <Bounce.h>

#define STOP 0
#define START 1
#define SHAKE 2

Bounce::Bounce(String name, int outputPin)
{
  _name = name;
  _outputPin = outputPin;
  _counter = 0;
}

void Bounce::SetRepetitions(long repetitionCount)
{
  _repetitions = repetitionCount;
}

void Bounce::SetDelayTime(long delayTime)
{
  _delayTime = delayTime;
}

/* This function will be called whenever a timer is due,
the set timer is passed as a parameter so you can read any property you need. */
void Bounce::timerCallback(Timer *timer)
{
  _timer = timer;   
  _counter = _counter + 1; 
  if (_timer->getAction() == START)
  {
    _counter = 0;
    Serial.print("BOUNCE: ");
    Serial.print(_name);
    Serial.print(" DELAYTIME ");
    Serial.print(_delayTime);
    Serial.print(" REPETITIONS ");
    Serial.println(_repetitions);    
    StensTimer::getInstance()->setTimer(this, SHAKE, _delayTime, _repetitions);
  }
  else if (_timer->getAction() == SHAKE)
  {     
    Bounce::shake();    
    if (_counter == _repetitions) {
      Serial.print("BOUNCE: REPETITIONS REACHED ");
      Serial.println(_counter);
      Bounce::Stop();
    }    
  }
  else if (_timer->getAction() == STOP)
  {
    Bounce::Stop();
  }
  else
  {
    Serial.println("Unknown Action");
  }
}

void Bounce::shake()
{
  Bounce::cylinder(random(0, 2));
}

void Bounce::Stop()
{
  Serial.print("BOUNCE: ");
  Serial.print(_name);
  Serial.println(" STOP ");
  StensTimer::getInstance()->deleteTimer(_timer);
  digitalWrite(_outputPin, RELAY_OFF);
}

void Bounce::cylinder(int randomAction)
{
  Serial.print("BOUNCE: ");
  Serial.print(_name);
  Serial.print(" ");
  Serial.println(randomAction);
  digitalWrite(_outputPin, randomAction);
}