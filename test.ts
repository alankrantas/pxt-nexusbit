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
