# MakeCode Editor Extension for Nexus:bit Expansion Board and NexusBot Biped Robot (BETA)

![logo-3](https://user-images.githubusercontent.com/44191076/56939149-3e0f2a80-6b39-11e9-96d0-225bd1d3b2b7.jpg)

![IMG_0035](https://user-images.githubusercontent.com/44191076/57355314-5538c280-71a0-11e9-8560-fbc70efd9578.JPG)

Nexus:bit is a powerful [BBC micro:bit](https://microbit.org/) multiple-purpose extension board made by [Taiwan Coding Education Association](http://www.beyond-coding.org.tw/).

## Import Extension

In the [MakeCode editor](https://makecode.microbit.org/) go to Advanced -> +Extension... and copy/paste the following url https://github.com/alankrantas/pxt-Nexusbit into the serach box. Press enter and you'll be able to import it.

## Product Information

Features of Nexus:bit include:

* an onboard rechargable 18650 lithium battery (included; 2600 mAh)
* a miniature joystick/botton board (the slot can also be used to install a HC-SR04/HC-SR04P ultrasonic sensor)
* onboard amplified buzzer (P0; can be disconnceted by removing a jumper), vibrator motor (P8), microphone (P12), single servo pin (P12) and a RGB LED (PCA9685 Pin 13-15)
* 12 PCA9685 servo pins
* 2 DC motor pins (P13-16)
* 5V/3.3V power output pins
* full breakout pins of micro:bit with additional I2C/SPI pins

![IMG_0006](https://user-images.githubusercontent.com/44191076/57355358-6a155600-71a0-11e9-912c-9fcd4bfde060.JPG)

You can in fact control Nexus:bit by using only standard MakeCode blocks plus third party PCA9685/Sonar extensions. However this extension/package enables users to make things more quickly with a series of bonus functions.

![IMG_0040](https://user-images.githubusercontent.com/44191076/57355393-7ef1e980-71a0-11e9-9b1b-28236775f7b7.JPG)

Video demo: https://www.youtube.com/watch?v=aCaN0LK8dZg

NexusBot is an OTTO-like 8-dof biped robot powered by micro:bit and Nexus:bit. This extension has some basic control blocks for this robot.

This extension is also appliable to Thunder:bit V1/V2 motor boards (you'll need to select the board type), which is similar to Nexus:bit except microphone and have only 4 PCA9685 servo pins.

## Calibrate NexutBot

To calibrate the robot, use the calibration block in the NexusBot section without any changes and download the code onto your micro:bit.

Power up the robot and all servos should be turned to default position (90 degrees for legs and feet, 0 or 180 degrees for arms and hands). Adjust each servo's installed position so that the robot stands still more or less, with both hands hug close to body (demostrated in the picture below).

![IMG_0033](https://user-images.githubusercontent.com/44191076/57355621-00497c00-71a1-11e9-89e4-7fcddb55f2cb.JPG)

Finally calibrate all servos' default position in the editor, until legs are straight, feet are flat on the ground and hands are pointed directly downward. Save the calibrated code in your computer for future use.

## Nexus:bit Test Code

```
nexusbit.servosToDegree([90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90])
input.onButtonPressed(Button.A, function () {
    nexusbit.servosToDegree([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    if (Math.randomBoolean()) {
        music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
    } else {
        music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
    }
})
input.onButtonPressed(Button.B, function () {
    nexusbit.servosToDegree([180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180])
    nexusbit.vibrator(512, 500)
    nexusbit.vibrator(128, 500)
})
basic.forever(function () {
    if (nexusbit.micTriggered()) {
        basic.showIcon(IconNames.Yes, 100)
    } else {
        basic.clearScreen()
    }
    if (nexusbit.joystickToDir(joystickDir.forward)) {
        nexusbit.rgbLedPreset(colorType.white, 100)
        nexusbit.DC(dcMotor.P15_16, 100)
    } else if (nexusbit.joystickToDir(joystickDir.backward)) {
        nexusbit.rgbLedPreset(colorType.blue, 100)
        nexusbit.DC(dcMotor.P15_16, -100)
    } else if (nexusbit.joystickToDir(joystickDir.left)) {
        nexusbit.rgbLedPreset(colorType.red, 100)
        nexusbit.DC(dcMotor.P13_14, 100)
    } else if (nexusbit.joystickToDir(joystickDir.right)) {
        nexusbit.rgbLedPreset(colorType.green, 100)
        nexusbit.DC(dcMotor.P13_14, -100)
    } else {
        nexusbit.rgbLedPreset(colorType.off, 100)
        nexusbit.DC(dcMotor.P13_14, 0)
        nexusbit.DC(dcMotor.P15_16, 0)
    }
})

```

## Extension Author

Alan Wang, micro:bit Education Material Developer of Taiwan Coding Education Association

## Nexus:bit/NexusBot Product Information

Check out the website of TCEA for more information, including where to buy them: [Nexus:bit/NexusBot](https://www.beyond-coding.org.tw/index.php?option=com_sppagebuilder&view=page&id=89) (English version will soon be available)

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

