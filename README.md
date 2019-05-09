# MakeCode Editor Extension for Nexus:bit and NexusBot

![logo](https://user-images.githubusercontent.com/44191076/57426674-c0db6800-7252-11e9-8a10-e25298072f5b.jpg)

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

The onboard PCA9685 chip has the I2C address of 0x40 (64).

![IMG_0006](https://user-images.githubusercontent.com/44191076/57355358-6a155600-71a0-11e9-912c-9fcd4bfde060.JPG)

You can in fact control Nexus:bit by using only standard MakeCode blocks plus third party PCA9685/Sonar extensions. However this extension/package enables users to make things more quickly with a series of bonus functions.

![IMG_0040](https://user-images.githubusercontent.com/44191076/57355393-7ef1e980-71a0-11e9-9b1b-28236775f7b7.JPG)

Video demo: https://www.youtube.com/watch?v=aCaN0LK8dZg

NexusBot is an OTTO-like 8-dof biped robot powered by micro:bit and Nexus:bit. This extension comes with basic control blocks for this robot.

This extension is also appliable to Thunder:bit V1/V2 motor boards (you'll need to select the board type), which is similar to Nexus:bit except microphone and have only 4 PCA9685 servo pins.

## Relative-Degree and Gradual Servo Control

One major function of this extension is to control servos by relative degrees, or vectors from their default position. This allows users to define and repeat more precise servo movements after simple calibrations. The extension also constrains servos' target position to be within 0-180 degrees, or whatever range the user defined.

For the example below:

```
nexusbit.servoConfig(
1,
80,
30,
150,
5
)
nexusbit.servosToDefl()
basic.forever(function () {
    nexusbit.servoDeltaFromDefl(1, -60)
    basic.pause(1000)
    nexusbit.servoDeltaFromDefl(1, 60)
    basic.pause(1000)
})
```

The default position of Servo 1 (on PCA9685) is set to 80 degrees with min and max degrees as 30 and 150. In the loop the servo would be turned to -60 (20) and +60 (140) degrees from its default position. However, due to the min constraint of 30 the servo would only be allowed to turn to 30 degrees.

The following code demostrates how to gradually (slowly, smoothly) turn 4 servos of a OTTO-like biped robot (first two servos are legs, last two are feet):

```
basic.forever(function () {
    nexusbit.servosSlowTurnDeltaFromDefl(
    [nexusbit.return_null(), nexusbit.return_null(), 40, 15],
    0
    )
    nexusbit.servosSlowTurnDeltaFromDefl(
    [20, 20, nexusbit.return_null(), nexusbit.return_null()],
    0
    )
    nexusbit.servosSlowTurnDeltaFromDefl(
    [nexusbit.return_null(), nexusbit.return_null(), -15, -40],
    0
    )
    nexusbit.servosSlowTurnDeltaFromDefl(
    [-20, -20, nexusbit.return_null(), nexusbit.return_null()],
    0
    )
})
```

The servo turning direction may be different on different robot configurations.

It can also be used like this, using while() loops which you can stop/break out whenever you want:

```
basic.forever(function () {
    while (nexusbit.servoSlowTurnDeltaFromDeflAndCheck([nexusbit.return_null(), nexusbit.return_null(), 40, 15])) {
    	
    }
    while (nexusbit.servoSlowTurnDeltaFromDeflAndCheck([20, 20, nexusbit.return_null(), nexusbit.return_null()])) {
    	
    }
    while (nexusbit.servoSlowTurnDeltaFromDeflAndCheck([nexusbit.return_null(), nexusbit.return_null(), -15, -40])) {
    	
    }
    while (nexusbit.servoSlowTurnDeltaFromDeflAndCheck([-20, -20, nexusbit.return_null(), nexusbit.return_null()])) {
    	
    }
})
```

In the NexusBot section some of the leg movements are already implemented, so you can simply coded it as

```
basic.forever(function () {
    nexusbot.robot_walk(botWalk.forward)
})
```

It is not recommended to gradually turn more than 4 servos at once, since this would slow down all servos' turning speed and make the movement less usable.

## Calibrate NexutBot

To calibrate the robot, use the calibration block in the NexusBot section without any changes and download the code onto your micro:bit.

```
nexusbot.robotCalibrate(
0,
0,
0,
0,
0,
0,
0,
0,
true
)
```

Power up the robot and all servos should be turned to default position (90 degrees for legs and feet, 0 or 180 degrees for arms and hands). Adjust each servo's installed position so that the robot stands still more or less, with both hands hug close to body (demostrated in the picture below).

![IMG_0033](https://user-images.githubusercontent.com/44191076/57355621-00497c00-71a1-11e9-89e4-7fcddb55f2cb.JPG)

Finally calibrate all servos' default position in the editor, until legs are straight, feet are flat on the ground and hands are pointed directly downward. Save the calibrated code in your computer for future use.

## Nexus:bit Test Code

To test Nexus:bit, connect joystick board, two DC motors and at least one servo to the expansion board, and flash the following code onto your micro:bit. Move the joystick around and press A/B to test various functions. When the mic is triggered the micro:bit would display a "yes" on its LED screen.

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

Email: alan@beyond-coding.org.tw

## Nexus:bit/NexusBot Product Information

Check out our TCEA website for more information, including where to buy them: [Nexus:bit/NexusBot](https://www.beyond-coding.org.tw/index.php?option=com_sppagebuilder&view=page&id=89) (English version will be available soon).

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

