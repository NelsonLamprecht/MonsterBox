/*
Copyright (C) 2019  Nelson Lamprecht

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

#ifndef Bounce_h
#define Bounce_h

#include <Arduino.h>
#include <string.h>
#include <StensTimer.h>

/* To allow callbacks on class instances you should let your class implement
IStensTimerListener and implement its timerCallback function as shown below */
class Bounce : public IStensTimerListener {

    public:
      constexpr static const uint8_t RELAY_OFF = 1;
      Bounce(String name, int outputPin);      
      void SetRepetitions(long repetitionCount);
      void SetDelayTime(long delayTime);
      void Stop(); 
      void timerCallback(Timer* timer); //From IStensTimerListener           
    private:
      Timer* _timer;
      String _name = "Unknown";
      int _outputPin = -1;
      long _repetitions; //how many times to bounce
      long _delayTime; //how often to pause between repetitions
      bool cancelToken = false;
      void shake();      
      void cylinder(int randomAction);
      
  };

#endif
