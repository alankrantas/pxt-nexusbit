# MakeCode Editor Extension for Nexus:bit and NexusBot

![logo](https://user-images.githubusercontent.com/44191076/57426674-c0db6800-7252-11e9-8a10-e25298072f5b.jpg)

![IMG_0035](https://user-images.githubusercontent.com/44191076/57355314-5538c280-71a0-11e9-8560-fbc70efd9578.JPG)

Nexus:bit is a powerful [BBC micro:bit](https://microbit.org/) multiple-purpose extension board made by [Taiwan Coding Education Association](http://www.beyond-coding.org.tw/). You can program Nexus:bit by using only standard MakeCode blocks plus third party PCA9685/Sonar extensions; however this extension/package provides various functions which are more powerful and easier to use.

## Import Extension

In the [MakeCode editor](https://makecode.microbit.org/) go to Advanced -> +Extension... and enter "nexusbit" or "TCEA" into the serach box. Press enter and you'll be able to import it. (Another way is to copy/paste the extension url https://github.com/alankrantas/pxt-Nexusbit into the search box.)

## Product Information

Check out our webpage for more information, including where to buy them:

[English version](https://www.beyond-coding.org.tw/component/sppagebuilder/?view=page&id=91)

[繁體中文介紹](https://www.beyond-coding.org.tw/index.php?option=com_sppagebuilder&view=page&id=89)

You can also contact me (alan@beyond-coding.org.tw) for order/partership requests or questions.

## Nexus:bit Features

* an onboard rechargable 18650 lithium battery (included; 2600 mAh)
* a miniature joystick/botton board (the slot can also be used to install a HC-SR04/HC-SR04P ultrasonic sensor)
* onboard amplified buzzer (P0; can be disconnceted by removing a jumper), vibrator motor (P8), microphone (P12), single servo pin (P12) and a RGB LED (PCA9685 Pin 13-15)
* 12 PCA9685 servo pins
* 2 DC motor pins (P13-16)
* 5V/3.3V power output pins
* full breakout pins of micro:bit with additional I2C/SPI pins

The onboard PCA9685 chip has the I2C address of 0x40 (64).

![IMG_0006](https://user-images.githubusercontent.com/44191076/57355358-6a155600-71a0-11e9-912c-9fcd4bfde060.JPG)

## NexusBot

NexusBot is an OTTO-like 8-dof biped robot powered by micro:bit and Nexus:bit. This extension comes with basic control blocks for this robot.

![IMG_0040](https://user-images.githubusercontent.com/44191076/57355393-7ef1e980-71a0-11e9-9b1b-28236775f7b7.JPG)

* Video demo: https://www.youtube.com/watch?v=aCaN0LK8dZg
* Video demo 2: https://www.youtube.com/watch?v=1JEVdHLj21k

The robot can also be refitted into a small 2WD car, using 2 DC motors in servo bodies with wheels attached. We use the DC motors since they are easier to control.

![IMG_0066](https://user-images.githubusercontent.com/44191076/58068030-40a5f280-7bc2-11e9-94fc-807f7433d7ea.JPG)

## Relative-Degree and Gradual Servo Control

One major function of this extension is to control servos by relative degrees, or vectors from their default position. This allows users to define and repeat more precise servo movements after simple calibrations. The extension also constrains servos' target position to be within 0-180 degrees, or whatever range the user defined.

Example:

```blocks
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

```blocks
basic.forever(function () {
    nexusbit.servosSlowTurnDeltaFromDefl(
    [null, null, 40, 15],
    0
    )
    nexusbit.servosSlowTurnDeltaFromDefl(
    [20, 20, null, null],
    0
    )
    nexusbit.servosSlowTurnDeltaFromDefl(
    [null, null, -15, -40],
    0
    )
    nexusbit.servosSlowTurnDeltaFromDefl(
    [-20, -20, null, null],
    0
    )
})
```

The servo turning direction may be different on different robot configurations.

It can also be used like this, using while() loops which you can stop/break out whenever you want:

```blocks
basic.forever(function () {
    while (nexusbit.servoSlowTurnDeltaFromDeflAndCheck([null, null, 40, 15])) {
    	
    }
    while (nexusbit.servoSlowTurnDeltaFromDeflAndCheck([20, 20, null, null])) {
    	
    }
    while (nexusbit.servoSlowTurnDeltaFromDeflAndCheck([null, null, -15, -40])) {
    	
    }
    while (nexusbit.servoSlowTurnDeltaFromDeflAndCheck([-20, -20, null, null])) {
    	
    }
})
```

In the NexusBot section some of the leg movements are already implemented, so you can simply use

```blocks
basic.forever(function () {
    nexusbot.robot_walk(botWalk.forward)
})
```

It is not recommended to gradually turn more than 4 servos at the same time, since this would slow down all servos' turning speed.

## Calibrate NexutBot

To calibrate the robot, use the calibration block in the NexusBot section without any changes and flash the code onto your micro:bit.

```blocks
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

Power up the robot and all servos should be turned to default position (90 degrees for legs and feet, 0 or 180 degrees for arms and hands). Adjust each servo's installed position so that the robot stands more or less straight, with both hands hug close to body (demostrated as the picture below).

![IMG_0033](https://user-images.githubusercontent.com/44191076/57355621-00497c00-71a1-11e9-89e4-7fcddb55f2cb.JPG)

Now calibrate all servos' default position (plus or minus degrees) in the MakeCode editor, until legs are straight, feet are flat on the ground and hands are pointed directly downward. Save the .hex file in your computer for future use.

See the NexusBot manual for more details.

## Nexus:bit Test Code

To test Nexus:bit, connect joystick board, two DC motors and at least one servo to the expansion board, and flash the following code onto your micro:bit. Move the joystick around and press A/B to test various functions. When the mic is triggered the micro:bit would display a "yes" icon on its LED screen.

```blocks
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

## Product Manual

[NexusBot assembly/calibration/basic control manual - English](https://www.slideshare.net/beyond-coding/nexus-bot-assembly-manual)

[NexusBot組裝/校正/基本控制手冊--繁體中文](https://www.slideshare.net/beyond-coding/nexusbot-147721934)

Nexus:bit user manual - English: (coming soon)

[Nexus:bit使用手冊--繁體中文](https://www.slideshare.net/beyond-coding/nexusbit-for-bbc-microbit)

You can also check out the quick version assembly video: https://www.youtube.com/watch?v=o8t25wX5Ztw

## Extension Author

Alan Wang, micro:bit Education Material Developer of Taiwan Coding Education Association

Email: alan@beyond-coding.org.tw

## Extension Translation

English (default), Traditional Chinese and Simplified Chinese

## Extension Compatibility to Thunder:bit V2/V1 Boards

This extension is also appliable to Thunder:bit V2/V1 expansion boards made by TCEA (you'll need to select the board type). Thunder:bits are similar to Nexus:bit, except they are larger (more suitable for maker projects), have no microphone and only have 8 (V2) or 4 (V1) PCA9685 servo pins. V2 version has a buzzer jumper as well.

![IMG_8904](https://user-images.githubusercontent.com/44191076/59016296-84138880-8873-11e9-9a9b-7402cb7c1de9.JPG)

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

