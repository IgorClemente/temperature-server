import Adafruit_DHT
import time

import time

import Adafruit_GPIO.SPI as SPI
import Adafruit_SSD1306

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

import subprocess

RST = None    

DC = 23
SPI_PORT = 0
SPI_DEVICE = 0

disp = Adafruit_SSD1306.SSD1306_128_32(rst=RST)

disp.begin()

disp.clear()
disp.display()

width = disp.width
height = disp.height
image = Image.new('1', (width, height))

draw = ImageDraw.Draw(image)

draw.rectangle((0,0,width,height), outline=0, fill=0)

padding = -2
top = padding
bottom = height-padding

x = 0

font = ImageFont.load_default()
font = ImageFont.truetype('Minecraftia-Regular.ttf', 18)

def dummy() :
    DHT_SENSOR = Adafruit_DHT.DHT22
    DHT_PIN = 4
    temperature = None	
    
    while temperature is None: 
        humidity,temp = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
        temperature = temp 
        time.sleep(0.1)

    draw.rectangle((0,0,width,height), outline=0, fill=0)

    draw.text((x, top+10), str("{:.0f}".format(temperature)) + "°C",  font=font, fill=255)

    disp.image(image)
    disp.display()
    time.sleep(.1)

    print (temperature)
    temperature = None
if __name__ =='__main__' :
    dummy = dummy()
