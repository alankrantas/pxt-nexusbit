let index = 0
input.onButtonPressed(Button.A, function () {
    music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
})
input.onButtonPressed(Button.B, function () {
    nexusbit.vibrator(1023, 1000)
    nexusbit.vibrator(512, 1000)
    nexusbit.vibrator(0, 0)
})
index = 0
nexusbit.selectBoard(boardType.nexusbit)
nexusbit.rgbLedPreset(colorType.red, 100)
nexusbit.P12_servo(90)
nexusbit.servosToDefl()
basic.pause(1000)
nexusbit.rgbLedPreset(colorType.green, 100)
nexusbit.P12_servo(0)
nexusbit.servosToDegree([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
nexusbit.DC_car(
carDir.forward,
carTurnMode.normal,
100,
100
)
basic.pause(1000)
nexusbit.rgbLedPreset(colorType.blue, 100)
nexusbit.P12_servo(180)
nexusbit.servosToDegree([180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180])
nexusbit.DC_car(
carDir.backward,
carTurnMode.normal,
100,
100
)
basic.pause(1000)
nexusbit.rgbLedPreset(colorType.white, 100)
basic.forever(function () {
    if (nexusbit.micTriggered()) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.clearScreen()
    }
    if (nexusbit.joystickToDir(joystickDir.forward)) {
        basic.showLeds(`
            . . # . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    } else if (nexusbit.joystickToDir(joystickDir.backward)) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . # . .
            `)
    } else if (nexusbit.joystickToDir(joystickDir.left)) {
        basic.showLeds(`
            . . . . .
            . . . . .
            # . . . .
            . . . . .
            . . . . .
            `)
    } else if (nexusbit.joystickToDir(joystickDir.right)) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . #
            . . . . .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    }
})
