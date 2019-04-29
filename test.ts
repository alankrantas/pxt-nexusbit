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
