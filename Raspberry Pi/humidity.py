import Adafruit_DHT
import time

   
def dummy() :
    DHT_SENSOR = Adafruit_DHT.DHT22
    DHT_PIN = 4
    temperature = None	
    
    while temperature is None: 
        humidity,temp = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
        temperature = temp 
        time.sleep(0.1)
    print (temperature)
    temperature = None
if __name__ =='__main__' :
    dummy = dummy()
