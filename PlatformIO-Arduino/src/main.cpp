/* main.cpp - MonsterBox Main */

#include "Arduino.h"
#include "avr/pgmspace.h"
#include "SPI.h"
#include "stdlib.h"
#include "string.h"
#include "ctype.h"
#include "Ethernet.h"
#include "WebServer.h"
#include "MonsterBoxUtility.h"
#include "MonsterBoxServer.h"
#define VERSION_STRING "2.1"

static bool SerialDebug = true;

/* MAC Address */
/* CHANGE THIS TO YOUR OWN UNIQUE VALUE FOR YOUR NETWORK */
static uint8_t mac[] = { 0x00, 0xAA, 0xBB, 0xCC, 0xDE, 0x02 };

// ROM-based messages used by the application instead of RAM
P(Html_begin) = "<html>";
P(Html_end) = "</html>";
P(Head) = "<head><title>MonsterBox " VERSION_STRING "</title></head>";
P(Page_begin) = "<body>";
P(Page_end) = "</body>";
P(Get_head) = "<h1>GET from ";
P(Post_head) = "<h1>POST to ";
P(Unknown_head) = "<h1>UNKNOWN request for ";
P(Default_head) = "unidentified URL</h1><br>\n";
P(Raw_head) = "raw.html</h1><br>\n";
P(Parsed_head) = "parsed.html</h1><br>\n";
P(Good_tail_begin) = "URL tail = '";
P(Bad_tail_begin) = "INCOMPLETE URL tail = '";
P(Tail_end) = "'<br>\n";
P(Parsed_tail_begin) = "URL parameters:<br>\n";
P(Parsed_item_separator) = "=";
P(Params_end) = "End of parameters<br>\n";
P(Post_params_begin) = "Parameters sent:<br>\n";
P(Line_break) = "<br>\n";

WebServer webserver;
MonsterBoxUtility monsterBoxUtility;
MonsterBoxServer monsterBoxServer(2, 4);

void SerialPrintDebug(const char *message) {
  if (SerialDebug) {
    Serial.println(message);
  }
}

void SerialPrintDebug(const int message) {
  if (SerialDebug) {
    Serial.println(message);
  }
}

int parseInput(char* inputValue) {
  if (strcmp(inputValue, MonsterBoxServer::CMD_STOP) == 0) {
    return 10;
  }
  else if (strcmp(inputValue, MonsterBoxServer::CMD_START) == 0) {
    return 20;
  }
  else if (strcmp(inputValue, MonsterBoxServer::CMD_SETDELAYTIMELOW) == 0) {
    return 30;
  }
  else if (strcmp(inputValue, MonsterBoxServer::CMD_SETDELAYTIMEHIGH) == 0) {
    return 31;
  }
  else if (strcmp(inputValue, MonsterBoxServer::CMD_SETREPETITIONSLOW) == 0) {
    return 40;
  }
  else if (strcmp(inputValue, MonsterBoxServer::CMD_SETREPETITIONSHIGH) == 0) {
    return 41;
  }
  else {
    if (isDigit(inputValue[0])) {
      return atoi(inputValue);
    }
    else {
      return -1;
    }
  }
}

void cmdExecute(char* inputName, char* inputValue) {
  int name = parseInput(inputName);  
  int value = parseInput(inputValue);  
  switch (name) {    
    case MonsterBoxServer::STOP:
      SerialPrintDebug("EXEC: STOP");
      //SerialPrintDebug(value);  
      monsterBoxServer.Stop();      
      break;
    case MonsterBoxServer::START:
      SerialPrintDebug("EXEC: START");      
      //SerialPrintDebug(value);  
      monsterBoxServer.Start();        
      break;
    case MonsterBoxServer::SETDELAYTIMELOW:      
      SerialPrintDebug("EXEC: SETDELAYTIMELOW");            
      //SerialPrintDebug(value);  
      monsterBoxServer.SetDelayTimeLow(value);
      break;
    case MonsterBoxServer::SETDELAYTIMEHIGH:      
      SerialPrintDebug("EXEC: SETDELAYTIMEHIGH");            
      //SerialPrintDebug(value);
      monsterBoxServer.SetDelayTimeHigh(value);
      break;
    case MonsterBoxServer::SETREPETITIONSLOW:     
      SerialPrintDebug("EXEC: SETREPETITIONSLOW");                
      //SerialPrintDebug(value);  
      monsterBoxServer.SetRepetitionLow(value);
      break;
    case MonsterBoxServer::SETREPETITIONSHIGH:     
      SerialPrintDebug("EXEC: SETREPETITIONSHIGH");                
      //SerialPrintDebug(value);  
      monsterBoxServer.SetRepetitionHigh(value);
      break;
    
    default:
      break;    
  }
}

void cmdMonsterBox(WebServer &server, WebServer::ConnectionType type, char *url_tail, bool tail_complete)
{
  #define NAMELEN 32
  #define VALUELEN 32
  char cmdName[NAMELEN];
  char cmdValue[VALUELEN];

  /* sends OK headers back to the browser */
  server.httpSuccess();

  if (type != WebServer::POST) {
    return;
  }
  else {    
    while (server.readPOSTparam(cmdName, NAMELEN, cmdValue, VALUELEN))
    {
      server.print(cmdName);
      server.printP(Parsed_item_separator);
      server.print(cmdValue);      
      cmdExecute(cmdName, cmdValue);
    }
  }  
}

/* commands are functions that get called by the webserver framework */   
void cmdDefault(WebServer &server, WebServer::ConnectionType type, char *url_tail, bool tail_complete)
{
  /* sends OK headers back to the browser */
  server.httpSuccess();

  /* if we're handling a GET or POST, we can output our data here.
     For a HEAD request, we just stop after outputting headers. */
  if (type == WebServer::HEAD)
    return;

  server.printP(Page_begin);
  switch (type)
  {
    case WebServer::GET:
      server.printP(Get_head);
      break;
    case WebServer::POST:
      server.printP(Post_head);
      break;
    default:
      server.printP(Unknown_head);
  }

  server.printP(Default_head);
  server.printP(tail_complete ? Good_tail_begin : Bad_tail_begin);
  server.print(url_tail);
  server.printP(Tail_end);
  server.printP(Page_end);
} 

void failCmd(WebServer &server, WebServer::ConnectionType type, char *url_tail, bool tail_complete)
{
  /* sends the "HTTP 400 - Bad Request" headers back to the browser */
  server.httpFail();

  /* if we're handling a GET or POST, we can output our data here.
     For a HEAD request, we just stop after outputting headers. */
  if (type == WebServer::HEAD)
    return;

  server.printP(Page_begin);
  switch (type)
  {
    case WebServer::GET:
      server.printP(Get_head);
      break;
    case WebServer::POST:
      server.printP(Post_head);
      break;
    default:
      server.printP(Unknown_head);
  }

  server.printP(Default_head);
  server.printP(tail_complete ? Good_tail_begin : Bad_tail_begin);
  server.print(url_tail);
  server.printP(Tail_end);
  server.printP(Page_end);
}

void maintainDhcp() {
  switch (Ethernet.maintain()) {
    case 1:
      //renewed fail
      SerialPrintDebug("Error: renewed fail");
      break;
    case 2:
      //renewed success
      Serial.print("Renewed success: ");
      SerialPrintDebug(Ethernet.localIP());
      break;
    case 3:
      //rebind fail
      SerialPrintDebug("Error: rebind fail");
      break;
    case 4:
      //rebind success
      Serial.print("Rebind success: ");
      SerialPrintDebug(Ethernet.localIP());
      break;
    default:
      //nothing happened
      break;
  }
}

void setup()
{
  // Open serial communications and wait for port to open:
  Serial.begin(115200);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  SerialPrintDebug("Setup begin");
  /* initialize the Ethernet adapter */
  // start the Ethernet connection:
  if (Ethernet.begin(mac) == 0) {
    if (Ethernet.hardwareStatus() == EthernetNoHardware) {
      SerialPrintDebug("Ethernet shield was not found.  Sorry, can't run without hardware. :(");
    } else if (Ethernet.linkStatus() == LinkOFF) {
      SerialPrintDebug("Ethernet cable is not connected.");
    }
    // no point in carrying on, so do nothing forevermore:
    while (true) {
      SerialPrintDebug("ack");
      delay(1);
    }
  }

  Serial.println(Ethernet.localIP());

  /* setup our default command that will be run when the user accesses
     the root page on the server */
  webserver.setDefaultCommand(&cmdDefault);

  /* setup our default command that will be run when the user accesses
     a page NOT on the server */
  webserver.setFailureCommand(&failCmd);

  /* /MonsterBox */
  webserver.addCommand("monsterbox", &cmdMonsterBox);

  /* start the webserver */
  webserver.begin();
  monsterBoxServer.Init();
  SerialPrintDebug("Setup end");
}

void loop()
{
  maintainDhcp();
  char buff[64];
  int len = 64;
  /* process incoming connections one at a time forever */
  webserver.processConnection(buff, &len);
  monsterBoxServer.Run();
}
