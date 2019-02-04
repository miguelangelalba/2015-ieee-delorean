import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(2, GPIO.IN)

def brake(channel):
    print('Objeto detectado en el camino')
    print('Activando protocolo de frenado de emergencia')

if __name__ == '__main__':
    GPIO.add_event_detect(2, GPIO.RISING, callback=brake)
    while True:
        pass
