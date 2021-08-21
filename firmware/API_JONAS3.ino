#include <Mindwave.h>
#include <ESP8266WiFi.h>
#include <Adafruit_NeoPixel.h>
#include <Arduino.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>

#define _SSID "FERREIRA 2.4GHz"        // Your WiFi SSID
#define _PASSWORD "20485091"    // Your WiFi Password

ESP8266WiFiMulti WiFiMulti;

#define DELAYLED 200
#define PIN D3
#define NUMLED 5
int varledest = 0;
Adafruit_NeoPixel pixels(NUMLED, PIN, NEO_GRB + NEO_KHZ800);

String dados;

String a1str0;
String a1str1;
String a1str2;
String a1str3;
String a1str4;
String a1str5;
String a1str6;
String a1str7;
String a1str8;
String a1str9;
String a1str10;
String a1str11;
String a1str12;

String amostrageral;

const byte NUM_LEITURAS = 30;
byte numAtual=0;

byte nSinal;
byte nAttention;
byte nMeditation;
byte nHighAlpha;
byte nLowAlpha;
byte nHighBeta;
byte nLowBeta;
byte nMidGamma;
byte nLowGamma;
byte nTheta;
byte nDelta;

bool loopMindWave;

Mindwave mindwave;


void setup() {
 Serial.begin(MINDWAVE_BAUDRATE);
 //----------------------------------------------------------------------------------------------
 pixels.begin();
 pixels.clear();
pixels.show();

pisca(0,100,100);
pisca(0,100,100);
pisca(0,100,100);
pisca(0,100,100);
pisca(0,100,100);
pisca(0,100,100);
pixels.setPixelColor(1, pixels.Color(0, 20, 20));
pixels.setPixelColor(2, pixels.Color(0, 20, 20));
pixels.setPixelColor(3, pixels.Color(0, 20, 20));
pixels.setPixelColor(4, pixels.Color(0, 20, 20));
pixels.setPixelColor(0, pixels.Color(0, 20, 70));
pixels.show(); 

Serial.println("[BrAIn] Iniciando..."); 

for (uint8_t t = 4; t > 0; t--) {
    Serial.printf("[SETUP] WAIT %d...\n", t);
    Serial.flush();
    delay(1000);
  }

  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(_SSID,_PASSWORD);

    

  while (WiFiMulti.run() != WL_CONNECTED) {
    delay(500);
    Serial.print("-");
  }
  

  Serial.println("");
  Serial.println("WiFi Connected");

  // Print the IP address
  Serial.print("Use this URL to connect: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");
  digitalWrite(LED_BUILTIN, HIGH);
//----------------------------------------------------------------------------------------------
  nSinal = 0;

  // Configura os pinos Entrada ou Saidas

  //Setup Serial para MindWave
  //Bluetooth com MindWave (ALPHA ONE)
  delay(500);
  Serial.println("[BrAIn] Sistema Leitura do NeuroSky Iniciada!!!");

}
void loop() 
{
  
  loopMindWave = true;
  while(loopMindWave == true)
  {
    //aguardar leitura do dispositivo não colocar nada aqui!!
    mindwave.update(Serial,onMindwaveData);
  }
  
  if (nSinal<75) 
  {   
    //NeuroSky sem sinal de leitura
    Serial.println("* SEM SINAL DE LEITURA *");
    lednosignal(); 
  }
  else  
  {
    //NeuroSky recebendo leitura
    debugSerial();
  }

 
  

}
void onMindwaveData()
{
    nSinal = mindwave.quality();
    nAttention = mindwave.attention();
    nMeditation = mindwave.meditation();
    nHighAlpha = mindwave.highAlpha();
    nLowAlpha = mindwave.lowAlpha();
    nHighBeta = mindwave.highBeta();
    nLowBeta = mindwave.lowBeta();
    nMidGamma = mindwave.midGamma();
    nLowGamma = mindwave.lowGamma();
    nTheta = mindwave.theta();
    nDelta = mindwave.delta();

    loopMindWave = false;
  
}

void debugSerial(){

    //Serial.println(" SINAL | ATTEN. | MEDIT. | H.ALPHA  | L.ALPHA | H.BETA | L.BETA | M.GAMMA | L.GAMMA | THETA | DELTA ");

    if (numAtual == 0){
      Serial.println("SINAL\tATTEN\tMED\tH.A\tL.A\tH.B\tL.B\tM.G\tL.G\tTHE\tDEL");
      apagarleds();
    }
    numAtual++;
    Serial.print(nSinal);
    Serial.print("\t");

    Serial.print(nAttention);
    Serial.print("\t");

    Serial.print(nMeditation);
    Serial.print("\t");

    Serial.print(nHighAlpha);
    Serial.print("\t");

    Serial.print(nLowAlpha);
    Serial.print("\t");

    Serial.print(nHighBeta);
    Serial.print("\t");

    Serial.print(nLowBeta);
    Serial.print("\t");

    Serial.print(nMidGamma);
    Serial.print("\t");

    Serial.print(nLowGamma);
    Serial.print("\t");

    Serial.print(nTheta);
    Serial.print("\t");

    Serial.print(nDelta);
    Serial.println();

Serial.println(numAtual);
//colocar if switch case

   a1str0 = String(nSinal);   
   a1str1 = String(nAttention);   
   a1str2 = String(nMeditation);   
   a1str3 = String(nHighAlpha);   
   a1str4 = String(nLowAlpha);   
   a1str5 = String(nHighBeta);   
   a1str6 = String(nLowBeta);   
   a1str7 = String(nMidGamma);   
   a1str8 = String(nLowGamma);   
   a1str9 = String(nTheta);   
   a1str10 = String(nDelta);
   a1str11 = String("0"); //U1
   a1str12 = String("0"); //U2
   
   amostrageral.concat(a1str0 +","+ a1str1 +","+ a1str2 +","+ a1str3 +","+ a1str4 +","+ a1str5 +","+ a1str6 +","+ a1str7 +","+ a1str8 +","+ a1str9 +","+ a1str10 +","+ a1str11+","+ a1str12 +";");
   dados = amostrageral; 
//   Serial.println(dados); 

   
//-----------
    if(numAtual == NUM_LEITURAS){
   
      Serial.println();
      Serial.println();

      Serial.println("Upload dos dados");
      pisca(100,100,100);
      pisca(100,100,100);
      pisca(100,100,100);

      pixels.setPixelColor(1, pixels.Color(30, 30, 30));
      pixels.setPixelColor(2, pixels.Color(30, 30, 30));
      pixels.setPixelColor(3, pixels.Color(30, 30, 30));
      pixels.setPixelColor(4, pixels.Color(30, 30, 30));
      pixels.setPixelColor(0, pixels.Color(30,30, 30));
      pixels.show(); 
     

      Serial.println("Concluido...");
      pisca(0,100,0);
      pisca(0,100,0);
      pisca(0,100,0);
      pisca(0,100,0);
      pisca(0,100,0);
                                                                             
     


  String cabecalho = "SINAL,ATTEN,MED,H.A,L.A,H.B,L.B,M.G,L.G,THE,DEL,U1,U2;";
  
  std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
  client->setInsecure();
  
  HTTPClient https;
  Serial.print("[HTTPS] begin...\n");
     if (https.begin(*client, "https://13.66.53.88/exams/write")) {  // HTTPS
      
      https.addHeader("Content-Type", "application/json");
      Serial.print("[HTTPS] GET...\n");
      // start connection and send HTTP header
      int httpCode = https.POST("{\"patientID\":\"60d754c5c1c5120caf92d650\",\"examData\":\""+cabecalho+dados+"\"}");

      // httpCode will be negative on error
      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTPS] POST... code: %d\n", httpCode);

        // file found at server
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = https.getString();
          Serial.println(payload);
        }
      } else {
        Serial.printf("[HTTPS] POST... failed, error: %s\n", https.errorToString(httpCode).c_str());
      }

      https.end();
    } else {
      Serial.printf("[HTTPS] Unable to connect\n");
    }

      Serial.println();
      Serial.println();

     numAtual=0;
    }

}


void lednosignal(){
 
if(varledest == 70){
varledest == 0;

}


varledest = varledest+35;

pixels.setPixelColor(0, pixels.Color(varledest, 0, 0)); 
pixels.setPixelColor(1, pixels.Color(varledest, 0, 0));
pixels.setPixelColor(2, pixels.Color(varledest, 0, 0));
pixels.setPixelColor(3, pixels.Color(varledest, 0, 0));
pixels.setPixelColor(4, pixels.Color(varledest, 0, 0));
pixels.show(); 
  
  }


  
void apagarleds(){

pixels.setPixelColor(0, pixels.Color(0, 0, 0)); 
pixels.setPixelColor(1, pixels.Color(0, 0, 0));
pixels.setPixelColor(2, pixels.Color(0, 0, 0));
pixels.setPixelColor(3, pixels.Color(0, 0, 0));
pixels.setPixelColor(4, pixels.Color(0, 0, 0));
pixels.show(); 
  
  }


    
void pisca(int red, int green, int blue){
  
pixels.setPixelColor(0, pixels.Color(red, green, blue));  
pixels.setPixelColor(1, pixels.Color(red, green, blue));
pixels.setPixelColor(2, pixels.Color(red, green, blue));
pixels.setPixelColor(3, pixels.Color(red, green, blue));
pixels.setPixelColor(4, pixels.Color(red, green, blue));
pixels.show(); 
delay(DELAYLED);
pixels.setPixelColor(1, pixels.Color(0, 0, 0));
pixels.setPixelColor(2, pixels.Color(0, 0, 0));
pixels.setPixelColor(3, pixels.Color(0, 0, 0));
pixels.setPixelColor(4, pixels.Color(0, 0, 0));
pixels.setPixelColor(0, pixels.Color(0, 0, 0));
pixels.show();
delay(DELAYLED);  
  }
