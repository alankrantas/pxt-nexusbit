# MakeCode Extension for Nexus:bit and NexusBot

Nexus:bit is a powerful BBC micro:bit multiple-purpose extension board made by Taiwan Coding Education Association:

* onboard rechargable 18650 lithium battery with reverse current/over charging protection
* miniature joystick/botton board (the connection slots can also be used to install a HC-SR04/HC-SR04P ultrasonic sensor)
* onboard amplified buzzer (P0; can be disconnceted by removing a jumper), vibrator motor (P8), microphone (P12), servo pin (P12) and a RGB LED (PCA9685 Pin 13-15)
* 12 PCA9685 servo pins
* 2 DC motor pins (P13-16)
* 5V/3.3V power output pins
* full breakout pins from micro:bit and extra I2C pins

You can control the Nexus:bit by using standard MakeCode blocks and third party PCA9685/Sonar extensions. However this extension/package comes with easy-to-use blocks for all features of Nexus:bit, as well as a library of powerful PCA9685 servo control functions which can be used on all kinds of robots.

NexusBot is an OTTO-like 8-dof biped robot powered by micro:bit and Nexus:bit. This extension has some basic control blocks for this robot.

This extension is also appliable to Thunder:bit V2 motor boards, which is similar to Nexus:bit except microphone and have only 4 PCA9685 servo pins.

## How to Import

In the editor go to Advanced -> +Extension... and copy/paste the url "https://github.com/alankrantas/pxt-Nexusbit" into the serach box. Press enter and you'll be able to import the extension.

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

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

