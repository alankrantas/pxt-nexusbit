# MakeCode Extension for Nexus:bit expansion board and NexusBot Biped Robot (BETA)

![logo-3](https://user-images.githubusercontent.com/44191076/56939149-3e0f2a80-6b39-11e9-96d0-225bd1d3b2b7.jpg)

![IMG_8292](https://user-images.githubusercontent.com/44191076/56938796-cdffa500-6b36-11e9-9379-e86c138079bb.JPG)

Nexus:bit is a powerful [BBC micro:bit](https://microbit.org/) multiple-purpose extension board made by [Taiwan Coding Education Association](http://www.beyond-coding.org.tw/). Its features include:

* an onboard rechargable 18650 lithium battery (included; 2600 mAh) with reverse current/over charging protection
* miniature joystick/botton board (the connection slots can also be used to install a HC-SR04/HC-SR04P ultrasonic sensor)
* onboard amplified buzzer (P0; can be disconnceted by removing a jumper), vibrator motor (P8), microphone (P12), servo pin (P12) and a RGB LED (PCA9685 Pin 13-15)
* 12 PCA9685 servo pins
* 2 DC motor pins (P13-16)
* 5V/3.3V power output pins
* full breakout pins from micro:bit and extra I2C pins

![IMG_0004](https://user-images.githubusercontent.com/44191076/56938974-fb991e00-6b37-11e9-849b-de573c8e856f.JPG)

You can control the Nexus:bit by using standard MakeCode blocks and third party PCA9685/Sonar extensions. However this extension/package comes with easy-to-use blocks for all features of Nexus:bit, as well as a library of powerful PCA9685 servo control functions which can be used on all kinds of robots.

![IMG_8244](https://user-images.githubusercontent.com/44191076/56938888-50886480-6b37-11e9-8371-d3cc1d953108.JPG)

Video demo: https://www.youtube.com/watch?v=aCaN0LK8dZg

NexusBot is an OTTO-like 8-dof biped robot powered by micro:bit and Nexus:bit. This extension has some basic control blocks for this robot.

This extension is also appliable to Thunder:bit V1/V2 motor boards (you'll need to select the board type), which is similar to Nexus:bit except microphone and have only 4 PCA9685 servo pins.

## Import Extension

In the [MakeCode editor](https://makecode.microbit.org/) go to Advanced -> +Extension... and copy/paste the url https://github.com/alankrantas/pxt-Nexusbit into the serach box. Press enter and you'll be able to import the extension.

## Nexus:bit/NexutBot Online Manual

(working in progress)

## Where to Buy Nexus:bit/NexutBot

(working in progress)

## Test Code

```
// this test code requires the joystick board

let index = 0

input.onButtonPressed(Button.A, function () {
    music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
    nexusbit.vibrator(256, 2000)
})

input.onButtonPressed(Button.B, function () {
    music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
    nexusbit.vibrator(1023, 2000)
})

nexusbit.selectBoard(boardType.nexusbit)
nexusbit.P12_servo(90)
nexusbit.rgbLedPreset(colorType.off, 100)
nexusbit.servosToDefl()
basic.forever(function () {
    if (nexusbit.joystickToDir(joystickDir.forward)) {
        nexusbit.DC(dcMotor.P13_14, 100)
        nexusbit.DC(dcMotor.P15_16, 100)
        nexusbit.rgbLedPreset(colorType.white, 100)
    } else if (nexusbit.joystickToDir(joystickDir.backward)) {
        nexusbit.DC(dcMotor.P13_14, -100)
        nexusbit.DC(dcMotor.P15_16, -100)
        nexusbit.rgbLedPreset(colorType.red, 100)
    } else if (nexusbit.joystickToDir(joystickDir.left)) {
        nexusbit.P12_servo(0)
        for (let index = 0; index <= 11; index++) {
            nexusbit.servoToMinMax(index + 1, servoDir.min)
        }
        nexusbit.rgbLedPreset(colorType.green, 100)
    } else if (nexusbit.joystickToDir(joystickDir.right)) {
        nexusbit.P12_servo(180)
        for (let index = 0; index <= 11; index++) {
            nexusbit.servoToMinMax(index + 1, servoDir.max)
        }
        nexusbit.rgbLedPreset(colorType.blue, 100)
    } else {
        nexusbit.DC(dcMotor.P13_14, 0)
        nexusbit.DC(dcMotor.P15_16, 0)
        nexusbit.rgbLedPreset(colorType.off, 100)
    }
})

basic.forever(function () {
    if (nexusbit.micTriggered()) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.clearScreen()
    }
})

```

## Author

Alan Wang of Taiwan Coding Education Association

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

