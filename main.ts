
let lastPixelNumber = 0
let numPixels = 0
let movementStep = 0
let loserStrip: neopixel.Strip = null
let p1Colour = 0
let raceDuration = 0
let defaultBrightness = 0
let strip1: neopixel.Strip = null
let p1Pos = 0
let p1Hue = 0
input.onPinPressed(TouchPin.P2, () => {
    p1Hue = Math.floor(Math.random() * 360);
    showBarUpTo(60);
    basic.pause(100);
    strip1.clear();
})

function runSliderAnimation(numFrames:number){
    strip1.clear();
    strip1.setPixelColor(0, neopixel.hsl(p1Hue, 99, 50));
    for (let i = 0; i < numFrames; i++){
        strip1.rotate(1);
        strip1.show();
        basic.pause(2);
    }
    strip1.clear();
}

function pulseRedAmberGreenTrafficLights() {
    strip1.setBrightness(defaultBrightness)
    trafficLightColour = NeoPixelColors.Red
    pulseTrafficLight()
    basic.pause(1000)
    trafficLightColour = NeoPixelColors.Orange
    pulseTrafficLight()
    basic.pause(1000)
    trafficLightColour = NeoPixelColors.Green
    pulseTrafficLight()
    basic.pause(1000)
    strip1.clear();
}

input.onGesture(Gesture.Shake, () => {
    radio.sendNumber(258);
})

function cycleP1Hue() {
    p1Hue += 2
    if (p1Hue >= 360) {
        p1Hue = 0
    }
}

input.onButtonPressed(Button.A, () => {
    showBarUpTo(50);
    basic.pause(500);
    showBarUpTo(0);
})

input.onButtonPressed(Button.B, () => {
    runSliderAnimation(500);
})

function showBarUpTo(num: number) {
    strip1.setBrightness(defaultBrightness)
    strip1.clear()
    for (let index = 0; index < num; index++) {
        strip1.setPixelColor(index, neopixel.hsl(p1Hue, 99, 50))
    }
    strip1.show()
}

function pulseTrafficLight() {
    strip1.clear()
    for (let index = 0; index <= numPixels / 3; index++) {
        strip1.setPixelColor(numPixels / 2 - index, trafficLightColour)
        strip1.setPixelColor(numPixels / 2 + index, trafficLightColour)
        strip1.show()
        basic.pause(2)
    }
}

radio.onDataPacketReceived(({ receivedNumber }) => {
    if (receivedNumber > 0 && receivedNumber < 256) {
        // strip1.showRainbow();   
        showBarUpTo(receivedNumber);
    } else if (receivedNumber == 256) {
        runSliderAnimation(1000);
    } else if (receivedNumber == 257) {
        pulseRedAmberGreenTrafficLights()        
    } else if (receivedNumber == 258) {
        strip1.showRainbow();
    } else if (receivedNumber >= 360) {
        p1Hue = receivedNumber % 360;
        showBarUpTo(60);
        basic.pause(100);
        strip1.clear();
    }
})


let trafficLightColour = 0
radio.setGroup(21)
movementStep = 1
numPixels = 60
lastPixelNumber = numPixels - 1
p1Hue = Math.random() * 360
defaultBrightness = 200
p1Pos = 0
p1Colour = neopixel.hsl(p1Hue, 99, 50)
trafficLightColour = NeoPixelColors.Red
strip1 = neopixel.create(DigitalPin.P0, numPixels, NeoPixelMode.RGBW)
raceDuration = 0
radio.sendNumber(0)
strip1.setPixelColor(p1Pos, p1Colour)
strip1.show()
basic.pause(500)
basic.showString("np:21", 50)
basic.forever(() => {
    basic.pause(100)
})