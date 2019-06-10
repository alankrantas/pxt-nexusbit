/**
* MakeCode extension for micro:bit expansion board "Nexus:bit" and robot "NexusBot" from Taiwan Coding Education Association (TCEA)
* By Alan Wang, 2019
*/

enum boardType {
    //% block="Nexus:bit"
    nexusbit,
    //% block="Thunder:bit V2"
    thunderbit_v2,
    //% block="Thunder:bit V1"
    thunderbit_v1,
}

enum joystickDir {
    //% block="forward"
    forward,
    //% block="backward"
    backward,
    //% block="left"
    left,
    //% block="right"
    right,
    //% block="center"
    center,
}

enum joystickSen {
    //% block="low"
    low = 100,
    //% block="normal"
    normal = 250,
    //% block="high"
    high = 400,
}

enum joystickAxis {
    //% block="x"
    x,
    //% block="y"
    y,
}

enum compareOpr {
    //% block="<"
    smaller,
    //% block=">"
    bigger,
}

enum colorType {
    //% block="white (full)"
    white,
    //% block="red"
    red,
    //% block="green"
    green,
    //% block="blue"
    blue,
    //% block="yellow"
    yellow,
    //% block="cyan"
    cyan,
    //% block="purple"
    purple,
    //% block="black (off)"
    off,
}

enum servoDir {
    //% block="min"
    min,
    //% block="max"
    max,
}

enum dcMotor {
    //% block="P13/P14"
    P13_14,
    //% block="P15/P16"
    P15_16,
}

enum carDir {
    //% block="forward"
    forward,
    //% block="backward"
    backward,
    //% block="left"
    left,
    //% block="right"
    right,
    //% block="stop"
    stop,
}

enum carTurnMode {
    //% block="normal"
    normal,
    //% block="rotate"
    rotate,
}

enum steMotorDir {
    //% block="1"
    one,
    //% block="2"
    two,
    //% block="stop"
    stop,
}

enum botAction {
    //% block="left leg straight"
    l_leg_straight,
    //% block="left leg outward"
    l_leg_out,
    //% block="left leg outward more"
    l_leg_out_more,
    //% block="left leg inward"
    l_leg_in,
    //% block="right leg straight"
    r_leg_straight,
    //% block="right leg outward"
    r_leg_out,
    //% block="right leg outward more"
    r_leg_out_more,
    //% block="right leg inward"
    r_leg_in,
    //% block="left foot flat"
    l_foot_flat,
    //% block="left foot down"
    l_foot_down,
    //% block="left foot down more"
    l_foot_down_more,
    //% block="left foot tiptoe"
    l_foot_tiptoe,
    //% block="left foot up"
    l_foot_up,
    //% block="right foot flat"
    r_foot_flat,
    //% block="right foot down"
    r_foot_down,
    //% block="right foot down more"
    r_foot_down_more,
    //% block="right foot tiptoe"
    r_foot_tiptoe,
    //% block="right foot up"
    r_foot_up,
    //% block="left arm lowest"
    l_arm_down,
    //% block="left arm low"
    l_arm_low,
    //% block="left arm level"
    l_arm_out,
    //% block="left arm high"
    l_arm_high,
    //% block="left arm highest"
    l_arm_up,
    //% block="right arm lowest"
    r_arm_down,
    //% block="right arm low"
    r_arm_low,
    //% block="right arm level"
    r_arm_out,
    //% block="right arm high"
    r_arm_high,
    //% block="right arm highest"
    r_arm_up,
    //% block="left hand inward"
    l_hand_close,
    //% block="left hand lowest"
    l_hand_down,
    //% block="left hand low"
    l_hand_low,
    //% block="left hand out"
    l_hand_out,
    //% block="left hand high"
    l_hand_high,
    //% block="left hand highest"
    l_hand_up,
    //% block="right hand lowest"
    r_hand_close,
    //% block="right hand low"
    r_hand_down,
    //% block="right hand inward"
    r_hand_low,
    //% block="right hand out"
    r_hand_out,
    //% block="right hand high"
    r_hand_high,
    //% block="right hand highest"
    r_hand_up,
}

enum botWalk {
    //% block="walk forward"
    forward,
    //% block="walk backward"
    backward,
    //% block="turn left"
    left,
    //% block="turn right"
    right,
    //% block="shuffle left"
    shuffle_left,
    //% block="shuffle right"
    shuffle_right,
    //% block="shuffle forward"
    shuffle_forward,
    //% block="shuffle backward"
    shuffle_backward,
    //% block="shuffle dance"
}

let _boardType: boardType = boardType.nexusbit

//% weight=200 color=#009fb7 icon="\uf1aa" block="Nexus:bit"
namespace nexusbit {

    let _joystickSen = joystickSen.normal
    let _servoNum = 12
    let _rLedPin = 15
    let _gLedPin = 14
    let _bLedPin = 13
    let _boardName = "Nexus:bit"
    let _initialized = false
    let _servoDefl = [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
    let _servoCurrent = [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
    let _servoMin = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let _servoMax = [180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180]
    let _servoDelta = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]

    function _initialize() {
        if (!_initialized) {
            PCA9685.reset(64)
            _initialized = true
        }
    }

    //% block="Select board type %type" group="1. Setup"
    export function selectBoard(type: boardType) {
        _boardType = type
        if (_boardType == boardType.nexusbit) {
            _boardName = "Nexus:bit"
            _servoNum = 12
            _rLedPin = 15
            _gLedPin = 14
            _bLedPin = 13
        } else {
            _boardName = "Thunder:bit "
            _boardName += (_boardType == boardType.thunderbit_v2) ? "V2" : "V1"
            _servoNum = (_boardType == boardType.thunderbit_v2) ? 8 : 4
            _rLedPin = 9
            _gLedPin = 10
            _bLedPin = 11
        }
    }

    //% block="Board information (see serial output)" group="1. Setup" advanced=true
    export function info() {
        serial.writeLine("Nexus:bit/Thunder:bit/NexusBot are products of Taiwan Coding Education Association (TCEA) (www.beyond-coding.org.tw)")
        serial.writeLine("Extension by Alan Wang, 2019. (github.com/alankrantas/pxt-Nexusbit)")
        serial.writeLine("Current selected board: " + _boardName)
        serial.writeLine("PCA9685 servo num: " + _servoNum)
    }

    //% block="Joystick direction %direction ?" group="2. Basic"
    export function joystickToDir(direction: joystickDir): boolean {
        switch (direction) {
            case joystickDir.forward:
                return pins.analogReadPin(AnalogPin.P2) <= 3 + _joystickSen
                break
            case joystickDir.backward:
                return pins.analogReadPin(AnalogPin.P2) >= 1020 - _joystickSen
                break
            case joystickDir.left:
                return pins.analogReadPin(AnalogPin.P1) >= 1020 - _joystickSen
                break
            case joystickDir.right:
                return pins.analogReadPin(AnalogPin.P1) <= 3 + _joystickSen
                break
            case joystickDir.center:
                return Math.abs((pins.analogReadPin(AnalogPin.P1) - 512)) < 50 && Math.abs((pins.analogReadPin(AnalogPin.P2) - 512)) < 50
        }
    }

    //% block="Joystick sensitivity %sen" sen.defl=joystickSen.normal group="2. Basic" advanced=true
    export function setJoystickSen(sen: joystickSen) {
        _joystickSen = sen
    }

    //% block="Joystick axis %axis analog reading" group="2. Basic" advanced=true
    export function joystickReading(axis: joystickAxis): number {
        return axis == joystickAxis.x ? pins.analogReadPin(AnalogPin.P1) : pins.analogReadPin(AnalogPin.P2)
    }

    //% block="Ultrasonic distance (cm)" group="2. Basic" advanced=true
    export function sonarDistance(): number {
        return Math.constrain(sonar.ping(DigitalPin.P5, DigitalPin.P11, PingUnit.Centimeters), 0, 200)
    }

    //% block="Ultrasonic distance %compare %distance (cm) ?" distance.min=1 distance.max=200 distance.defl=15 group="2. Basic" advanced=true
    export function sonarCheck(compare: compareOpr, distance: number): boolean {
        let d = sonarDistance()
        if (d > 0) {
            d = Math.constrain(d, 1, 200)
            return compare == compareOpr.smaller ? d < distance : d > distance
        } else {
            return false
        }
    }

    //% block="Buzzer play (Hz) %freq duration (ms) %duration" duration.shadow="timePicker" duration.defl=0 freq.shadow="device_note" group="2. Basic"
    export function buzzer(freq: number, duration: number) {
        pins.analogSetPitchPin(AnalogPin.P0)
        pins.analogPitch(freq, duration)
    }

    //% block="Mic triggered ?" group="2. Basic" advanced=true
    export function micTriggered(): boolean {
        pins.setPull(DigitalPin.P12, PinPullMode.PullNone)
        return pins.digitalReadPin(DigitalPin.P12) == 1 && _boardType == boardType.nexusbit
    }

    //% block="Vibrator motor level %level duration (ms) %duration" level.min=0 level.max=1023 level.defl=512 duration.min=0 duration.defl=0 duration.shadow="timePicker" group="2. Basic"
    export function vibrator(level: number, duration: number) {
        if (level == 1023) pins.digitalWritePin(DigitalPin.P8, 1)
        else pins.analogWritePin(AnalogPin.P8, Math.constrain(level, 0, 1023))
        if (duration > 0) {
            basic.pause(duration)
            pins.digitalWritePin(DigitalPin.P8, 0)
        }
    }

    //% block="P12 servo turn to %degree degree(s)" degree.shadow="protractorPicker" degree.defl=180 group="2. Basic"
    export function P12_servo(degree: number) {
        pins.servoWritePin(AnalogPin.P12, Math.constrain(degree, 0, 180))
    }

    //% block="PCA9685 RGB LED set to|red = %red|green = %green|blue = %blue" red.min=0 red.max=100 red.defl=100 green.min=0 green.max=100 green.defl=100 blue.min=0 blue.max=100 blue.defl=100 group="3. PCA9685 RGB LED" blockExternalInputs=true
    export function rgbLed(red: number, green: number, blue: number) {
        _initialize()
        PCA9685.setLedDutyCycle(_rLedPin, 100 - Math.constrain(red, 0, 100), 64)
        PCA9685.setLedDutyCycle(_gLedPin, 100 - Math.constrain(green, 0, 100), 64)
        PCA9685.setLedDutyCycle(_bLedPin, 100 - Math.constrain(blue, 0, 100), 64)
    }

    //% block="PCA9685 RGB LED set to %color brightness level %level" level.min=0 level.max=100 level.defl=100 color.fieldEditor="gridpicker" group="3. PCA9685 RGB LED"
    export function rgbLedPreset(color: colorType, level: number) {
        _initialize()
        switch (color) {
            case colorType.white:
                rgbLed(level, level, level)
                break
            case colorType.red:
                rgbLed(level, 0, 0)
                break
            case colorType.green:
                rgbLed(0, level, 0)
                break
            case colorType.blue:
                rgbLed(0, 0, level)
                break
            case colorType.yellow:
                rgbLed(level, level, 0)
                break
            case colorType.cyan:
                rgbLed(0, level, level)
                break
            case colorType.purple:
                rgbLed(level, 0, level)
                break
            case colorType.off:
                rgbLed(0, 0, 0)
        }
    }

    //% block="PCA9685 RGB LED set to random color" group="3. PCA9685 RGB LED" advanced=true
    export function rgbLedRandom() {
        rgbLed(Math.randomRange(0, 100), Math.randomRange(0, 100), Math.randomRange(0, 100))
    }

    //% block="Configure PCA9685 servo no. %servo|default degree(s) = %deflDegree|min degree(s) = %minDegree|max degree(s) = %maxDegree|gradually turning degree(s) = %delta" servo.min=1 servo.max=12 servo.defl=1 deflDegree.shadow="protractorPicker" deflDegree.defl=90 minDegree.shadow="protractorPicker" minDegree.defl=0 maxDegree.shadow="protractorPicker" maxDegree.defl=180 delta.shadow="protractorPicker" delta.defl=5 group="4. PCA9685 Servos" advanced=true
    export function servoConfig(servo: number, deflDegree: number, minDegree: number, maxDegree: number, delta: number) {
        if (servo > 0 && servo <= _servoNum) {
            _servoMin[servo - 1] = Math.constrain(minDegree, 0, 180)
            _servoMax[servo - 1] = (Math.constrain(maxDegree, 0, 180) >= minDegree) ? Math.constrain(maxDegree, 0, 180) : _servoMin[servo - 1]
            _servoDefl[servo - 1] = Math.constrain(deflDegree, _servoMin[servo - 1], _servoMax[servo - 1])
            _servoDelta[servo - 1] = Math.constrain(delta, 0, 180)
        }
    }

    //% block="Adjust PCA9685 servos default position|by array %deflDegrees" group="4. PCA9685 Servos" blockExternalInputs=true advanced=true
    export function servosDeflAdjust(deflDegrees: number[]) {
        if (deflDegrees != null && deflDegrees.length <= _servoNum)
            for (let i = 0; i < deflDegrees.length; i++) _servoDefl[i] = Math.constrain(_servoDefl[i] + deflDegrees[i], _servoMin[i], _servoMax[i])
    }

    //% block="Set PCA9685 servos greadually turing degree(s)|by array %deltas" group="4. PCA9685 Servos" blockExternalInputs=true advanced=true
    export function servoSetDelta(deltas: number[]) {
        if (deltas != null && deltas.length <= _servoNum)
            for (let i = 0; i < deltas.length; i++) if (deltas[i] != null && deltas[i] > 0) _servoDelta[i] = Math.constrain(deltas[i], 0, 180)
    }

    //% block="PCA9685 servo no. %servo turn to %degree degree(s)" servo.min=1 servo.max=12 servo.defl=1 degree.shadow="protractorPicker" degree.defl=180 group="4. PCA9685 Servos"
    export function servoTo(servo: number, degree: number) {
        _initialize()
        degree = Math.constrain(degree, _servoMin[servo - 1], _servoMax[servo - 1])
        if (servo > 0 && servo <= _servoNum) {
            _servoCurrent[servo - 1] = degree
            PCA9685.setServoPosition(servo, degree, 64)
        }
    }

    //% block="Get PCA9685 servo no. %servo current position" servo.min=1 servo.max=12 servo.defl=1 deltaArray.min=0 deltaArray.max=180 deltaArray.defl=5 group="4. PCA9685 Servos" advanced=true
    export function getServoCurrent(servo: number): number {
        return (servo > 0 && servo <= _servoNum) ? _servoCurrent[servo - 1] : 0
    }

    //% block="PCA9685 servo no. %servo turn to %direction degree(s)" servo.min=1 servo.max=12 servo.defl=1 group="4. PCA9685 Servos"
    export function servoToMinMax(servo: number, direction: servoDir) {
        servoTo(servo, direction == servoDir.min ? _servoMin[servo - 1] : _servoMax[servo - 1])
    }

    //% block="PCA9685 servo no. %servo move %delta degree(s) from default" servo.min=1 servo.max=12 servo.defl=1 delta.min=-180 delta.max=180 delta.defl=0 group="4. PCA9685 Servos"
    export function servoDeltaFromDefl(servo: number, delta: number) {
        servoTo(servo, _servoDefl[servo - 1] + delta)
    }

    //% block="PCA9685 servo no. %servo gradually turn toward %degree degree(s)" servo.min=1 servo.max=12 servo.defl=1 degree.shadow="protractorPicker" degree.defl=90 group="4. PCA9685 Servos" advanced=true
    export function servoSlowTurn(servo: number, degree: number) {
        degree = Math.constrain(degree, _servoMin[servo - 1], _servoMax[servo - 1])
        let newDegree = _servoCurrent[servo - 1]
        if (Math.abs(degree - _servoCurrent[servo - 1]) > 0 && Math.abs(degree - _servoCurrent[servo - 1]) <= _servoDelta[servo - 1]) {
            servoTo(servo, degree)
        } else {
            if (degree > _servoCurrent[servo - 1]) newDegree = _servoCurrent[servo - 1] + _servoDelta[servo - 1]
            else if (degree < _servoCurrent[servo - 1]) newDegree = _servoCurrent[servo - 1] - _servoDelta[servo - 1]
            servoTo(servo, newDegree)
        }
    }

    //% block="PCA9685 servo no. %servo at %degree degree(s) %check ?" servo.min=1 servo.max=12 servo.defl=1 degree.shadow="protractorPicker" degree.defl=90 group="4. PCA9685 Servos" advanced=true
    export function ServoIsAtDegree(servo: number, degree: number, check: boolean) {
        if (servo > 0 && servo <= _servoNum) return check ? getServoCurrent(servo) == degree : !(getServoCurrent(servo) == degree)
        else return false
    }

    //% block="PCA9685 servo no. %servo gradually turn toward %direction degree(s)" servo.min=1 servo.max=12 servo.defl=1 group="4. PCA9685 Servos" advanced=true
    export function servoSlowTurnMinMax(servo: number, direction: servoDir) {
        servoSlowTurn(servo, direction == servoDir.min ? _servoMin[servo - 1] : _servoMax[servo - 1])
    }

    //% block="PCA9685 servo no. %servo at %direction degree(s) %check ?" servo.min=1 servo.max=12 servo.defl=1 group="4. PCA9685 Servos" advanced=true
    export function ServoIsAtMinMax(servo: number, direction: servoDir, check: boolean) {
        return ServoIsAtDegree(servo, direction == servoDir.min ? _servoMin[servo - 1] : _servoMax[servo - 1], check)
    }

    //% block="PCA9685 servo no. %servo gradually move %delta degree(s) from default" servo.min=1 servo.max=12 servo.defl=1 delta.min=-180 delta.max=180 delta.defl=0 group="4. PCA9685 Servos" advanced=true
    export function servoSlowTurnDeltaFromDefl(servo: number, delta: number) {
        let target = Math.constrain(_servoDefl[servo - 1] + delta, _servoMin[servo - 1], _servoMax[servo - 1])
        let newDegree = _servoCurrent[servo - 1]
        if (Math.abs(target - newDegree) > 0 && Math.abs(target - newDegree) <= _servoDelta[servo - 1]) {
            servoTo(servo, target)
        } else {
            if (target > _servoCurrent[servo - 1]) newDegree = _servoCurrent[servo - 1] + _servoDelta[servo - 1]
            else if (target < _servoCurrent[servo - 1]) newDegree = _servoCurrent[servo - 1] - _servoDelta[servo - 1]
            servoTo(servo, newDegree)
        }
    }

    //% block="PCA9685 servo no. %servo at degree(s) %delta from default %check ?" servo.min=1 servo.max=12 servo.defl=1 delta.min=-180 delta.max=180 delta.defl=0 group="4. PCA9685 Servos" advanced=true
    export function servoIsDeltaFromDefl(servo: number, delta: number, check: boolean) {
        return ServoIsAtDegree(servo, _servoDefl[servo - 1] + delta, check)
    }

    //% block="PCA9685 all servos gradually move from default|by array %deltas|turning delay (ms) = %delay" group="4. PCA9685 Servos" blockExternalInputs=true advanced=true
    export function servosSlowTurnDeltaFromDefl(deltas: number[], delay: number) {
        let check = true
        if (delay < 0) delay = 0
        if (deltas != null && deltas.length <= _servoNum) {
            while (true) {
                check = true
                for (let i = 0; i < deltas.length; i++) {
                    if (deltas[i] != null) {
                        if (servoIsDeltaFromDefl(i + 1, deltas[i], false)) {
                            servoSlowTurnDeltaFromDefl(i + 1, deltas[i])
                            if (check) check = false
                        }
                    }
                }
                if (check) break
                if (delay > 0) basic.pause(delay)
            }
        }
    }

    //% block="PCA9685 all servos gradually move %delta from default if not done" group="4. PCA9685 Servos" advanced=true
    export function servoSlowTurnDeltaFromDeflAndCheck(delta: number[]): boolean {
        let check = true
        if (delta != null && delta.length <= _servoNum) {
            for (let i = 0; i < delta.length; i++) {
                if (servoIsDeltaFromDefl(i + 1, delta[i], false)) {
                    servoSlowTurnDeltaFromDefl(i + 1, delta[i])
                    if (check) check = false
                }
            }
        }
        return !check
    }

    //% block="All PCA9685 servos turn to default" group="4. PCA9685 Servos"
    export function servosToDefl() {
        for (let i = 0; i < _servoNum; i++)
            servoTo(i + 1, _servoDefl[i])
    }

    //% block="All PCA9685 servos turn to degrees %degree" group="4. PCA9685 Servos"
    export function servosToDegree(degrees: number[]) {
        if (degrees != null && degrees.length <= _servoNum)
            for (let i = 0; i < degrees.length; i++)
                if (degrees[i] != null)
                    servoTo(i + 1, degrees[i])
    }

    //% block="All PCA9685 servos move to degrees %deltas from default" group="4. PCA9685 Servos" blockExternalInputs=true
    export function servosToDeltaFromDefl(deltas: number[]) {
        if (deltas != null && deltas.length <= _servoNum)
            for (let i = 0; i < deltas.length; i++)
                if (deltas[i] != null)
                    servoTo(i + 1, _servoDefl[i] + deltas[i])
    }

    //% block="(null)" group="4. PCA9685 Servos" advanced=true
    export function return_null(): number {
        return null
    }

    //% block="DC motor %motor speed %speed" speed.shadow="speedPicker" speed.defl=100 group="5. DC/Stepper Motors"
    export function DC(motor: dcMotor, speed: number) {
        let dPin1: DigitalPin
        let dPin2: DigitalPin
        let aPin1: AnalogPin
        let aPin2: AnalogPin
        let fullSpeed = (Math.abs(speed) == 100)
        if (motor == dcMotor.P13_14) {
            dPin1 = DigitalPin.P13
            dPin2 = DigitalPin.P14
            aPin1 = AnalogPin.P13
            aPin2 = AnalogPin.P14
        } else {
            dPin1 = DigitalPin.P15
            dPin2 = DigitalPin.P16
            aPin1 = AnalogPin.P15
            aPin2 = AnalogPin.P16
        }
        if (speed > 0) {
            if (fullSpeed) pins.digitalWritePin(dPin1, 1)
            else pins.analogWritePin(aPin1, 1023 * speed / 100)
            pins.digitalWritePin(dPin2, 0)
        } else if (speed < 0) {
            pins.digitalWritePin(dPin1, 0)
            if (fullSpeed) pins.digitalWritePin(dPin2, 1)
            else pins.analogWritePin(aPin2, 1023 * (speed * -1) / 100)
        } else {
            pins.digitalWritePin(dPin1, 0)
            pins.digitalWritePin(dPin2, 0)
        }
    }

    //% block="2WD DC motor car|direction %direction|turn mode %mode|right motor (A, P13/14) speed %rightSpeed|left motor (B, P15/16) speed %leftSpeed" rightSpeed.min=0 rightSpeed.max=100 rightSpeed.defl=100 leftSpeed.min=0 leftSpeed.max=100 leftSpeed.defl=100 direction.fieldEditor="gridpicker" group="5. DC/Stepper Motors" blockExternalInputs=true advanced=true
    export function DC_car(direction: carDir, mode: carTurnMode, rightSpeed: number, leftSpeed: number) {
        switch (direction) {
            case carDir.forward:
                DC(dcMotor.P13_14, rightSpeed)
                DC(dcMotor.P15_16, leftSpeed)
                break
            case carDir.backward:
                DC(dcMotor.P13_14, rightSpeed * -1)
                DC(dcMotor.P15_16, leftSpeed * -1)
                break
            case carDir.left:
                DC(dcMotor.P13_14, rightSpeed)
                DC(dcMotor.P15_16, (mode == carTurnMode.rotate) ? leftSpeed * -1 : 0)
                break
            case carDir.right:
                DC(dcMotor.P13_14, (mode == carTurnMode.rotate) ? rightSpeed * -1 : 0)
                DC(dcMotor.P15_16, leftSpeed)
                break
            case carDir.stop:
                DC(dcMotor.P13_14, 0)
                DC(dcMotor.P15_16, 0)
        }
    }

    //% block="Stepper motor 1 step|(with ULN2003 driver board)|IN1 = %pin1 IN2 = %pin2 IN3 = %pin3 IN4 = %pin4|direction %direction|cycle delay (us) = %delay" pin1.defl=DigitalPin.P13 pin2.defl=DigitalPin.P14 pin3.defl=DigitalPin.P15 pin4.defl=DigitalPin.P16 delay.min=2300 delay.defl=2300 group="5. DC/Stepper Motors"
    export function stepMotor(pin1: DigitalPin, pin2: DigitalPin, pin3: DigitalPin, pin4: DigitalPin, direction: steMotorDir, delay: number) {
        let pins_array: DigitalPin[] = [pin1, pin2, pin3, pin4]
        if (delay < 2300) delay = 2300
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let index = -1
                if (direction == steMotorDir.one) index = j
                else if (direction == steMotorDir.two) index = 3 - j
                if (i == j && index >= 0) pins.digitalWritePin(pins_array[index], 1)
                else pins.digitalWritePin(pins_array[index], 0)
            }
            control.waitMicros(delay)
        }
    }

    //% block="2WD stepper motor car 1 step|(with ULN2003 driver boards)|motor A IN1 = %pin1a|motor A IN2 = %pin2a|motor A IN3 = %pin3a|motor A IN4 = %pin4a|motor B IN1 = %pin1b|motor B IN2 = %pin2b|motor B IN3 = %pin3b|motor B IN4 = %pin4b|motor A direction %direction_1|motor B direction %direction_2|cycle delay (us) = %delay|disable LEDs %disable_led" pin1a.defl=DigitalPin.P6 pin2a.defl=DigitalPin.P7 pin3a.defl=DigitalPin.P9 pin4a.defl=DigitalPin.P10 pin1b.defl=DigitalPin.P13 pin2b.defl=DigitalPin.P14 pin3b.defl=DigitalPin.P15 pin4b.defl=DigitalPin.P16 delay.min=2300 delay.defl=2300 disable_led.defl=true group="5. DC/Stepper Motors" advanced=true
    export function stepMotorCar(pin1a: DigitalPin, pin2a: DigitalPin, pin3a: DigitalPin, pin4a: DigitalPin, pin1b: DigitalPin, pin2b: DigitalPin, pin3b: DigitalPin, pin4b: DigitalPin, direction_1: steMotorDir, direction_2: steMotorDir, delay: number, disable_led: boolean) {
        let pins_array_1: DigitalPin[] = [pin1a, pin2a, pin3a, pin4a]
        let pins_array_2: DigitalPin[] = [pin1b, pin2b, pin3b, pin4b]
        led.enable(!disable_led)
        if (delay < 2300) delay = 2300
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let index_1 = -1
                let index_2 = -1
                if (direction_1 == steMotorDir.one) index_1 = j
                else if (direction_1 == steMotorDir.two) index_1 = 3 - j
                if (direction_2 == steMotorDir.one) index_2 = j
                else if (direction_2 == steMotorDir.two) index_2 = 3 - j
                if (i == j) {
                    if (index_1 >= 0) pins.digitalWritePin(pins_array_1[index_1], 1)
                    if (index_2 >= 0) pins.digitalWritePin(pins_array_2[index_2], 1)
                } else {
                    pins.digitalWritePin(pins_array_1[index_1], 0)
                    pins.digitalWritePin(pins_array_2[index_2], 0)
                }
            }
            control.waitMicros(delay)
        }
    }

}

//% weight=200 color=#e8446d icon="\uf113" block="NexusBot"
namespace nexusbot {

    let isInAction = false

    //% block="Servos calibration|(degrees from default:)|Left leg (servo 1) %servo1|Right leg (servo 2) %servo2|Left foot (servo 3) %servo3|Right foot (servo 4) %servo4|Left arm (servo 5) %servo5|Right arm (servo 6) %servo6|Left hand (servo 7) %servo7|Right hand (servo 8) %servo8|then stand still %stand_still" servo1.min=-180 servo1.max=180 servo1.defl=0 servo2.min=-180 servo2.max=180 servo2.defl=0 servo3.min=-180 servo3.max=180 servo3.defl=0 servo4.min=-180 servo4.max=180 servo4.defl=0 servo5.min=-180 servo5.max=180 servo5.defl=0 servo6.min=-180 servo6.max=180 servo6.defl=0 servo7.min=-180 servo7.max=180 servo7.defl=0 servo8.min=-180 servo8.max=180 servo8.defl=0 stand_still.defl=true
    export function robotCalibrate(servo1: number, servo2: number, servo3: number, servo4: number, servo5: number, servo6: number, servo7: number, servo8: number, stand_still: boolean) {
        if (_boardType != boardType.thunderbit_v1)
            nexusbit.servosDeflAdjust([servo1, servo2, servo3, servo4, servo5 + 90, servo6 - 90, servo7 - 90, servo8 + 90])
        else
            nexusbit.servosDeflAdjust([servo1, servo2, servo3, servo4])
        if (stand_still) {
            robotStandstill()
            basic.pause(500)
        }
    }

    //% block="Servos gradual turn speed %speed" speed.min=1 speed.max=10 speed.defl=5 advanced=true
    export function robotSpeed(speed: number) {
        if (_boardType != boardType.thunderbit_v1)
            nexusbit.servoSetDelta([speed, speed, speed, speed, speed, speed, speed, speed])
        else
            nexusbit.servoSetDelta([speed, speed, speed, speed])
    }

    //% block="Stand still"
    export function robotStandstill() {
        isInAction = true
        nexusbit.servosToDefl()
        isInAction = false
    }

    //% block="Stand still (legs and feet only)"
    export function robotLegStandStill() {
        isInAction = true
        nexusbit.servosToDeltaFromDefl([0, 0, 0, 0])
        isInAction = false
    }

    function _servoMove(s: number, d: number) {
        nexusbit.servoDeltaFromDefl(s, d)
    }

    //% block="Action: %action" action.fieldEditor="gridpicker"
    export function robotAction(action: botAction) {
        isInAction = true
        switch (action) {
            case botAction.l_leg_straight:
                _servoMove(1, 0)
                break
            case botAction.l_leg_out:
                _servoMove(1, -20)
                break
            case botAction.l_leg_out_more:
                _servoMove(1, -40)
                break
            case botAction.l_leg_in:
                _servoMove(1, 20)
                break
            case botAction.r_leg_straight:
                _servoMove(2, 0)
                break
            case botAction.r_leg_out:
                _servoMove(2, 20)
                break
            case botAction.r_leg_out_more:
                _servoMove(2, 40)
                break
            case botAction.r_leg_in:
                _servoMove(2, -20)
                break
            case botAction.l_foot_flat:
                _servoMove(3, 0)
                break
            case botAction.l_foot_down:
                _servoMove(3, 15)
                break
            case botAction.l_foot_down_more:
                _servoMove(3, 40)
                break
            case botAction.l_foot_tiptoe:
                _servoMove(3, 60)
                break
            case botAction.l_foot_up:
                _servoMove(3, -15)
                break
            case botAction.r_foot_flat:
                _servoMove(4, 0)
                break
            case botAction.r_foot_down:
                _servoMove(4, -15)
                break
            case botAction.r_foot_down_more:
                _servoMove(4, -40)
                break
            case botAction.r_foot_tiptoe:
                _servoMove(4, -60)
                break
            case botAction.r_foot_up:
                _servoMove(4, 15)
                break
            case botAction.l_arm_down:
                _servoMove(5, 0)
                break
            case botAction.l_arm_low:
                _servoMove(5, -45)
                break
            case botAction.l_arm_out:
                _servoMove(5, -90)
                break
            case botAction.l_arm_high:
                _servoMove(5, -135)
                break
            case botAction.l_arm_up:
                _servoMove(5, -180)
                break
            case botAction.r_arm_down:
                _servoMove(6, 0)
                break
            case botAction.r_arm_low:
                _servoMove(6, 45)
                break
            case botAction.r_arm_out:
                _servoMove(6, 90)
                break
            case botAction.r_arm_high:
                _servoMove(6, 135)
                break
            case botAction.r_arm_up:
                _servoMove(6, 180)
                break
            case botAction.l_hand_down:
                _servoMove(7, 0)
                break
            case botAction.l_hand_close:
                _servoMove(7, -15)
                break
            case botAction.l_hand_low:
                _servoMove(7, 45)
                break
            case botAction.l_hand_out:
                _servoMove(7, 90)
                break
            case botAction.l_hand_high:
                _servoMove(7, 135)
                break
            case botAction.l_hand_up:
                _servoMove(7, 180)
                break
            case botAction.r_hand_down:
                _servoMove(8, 0)
                break
            case botAction.r_hand_close:
                _servoMove(8, 15)
                break
            case botAction.r_hand_low:
                _servoMove(8, -45)
                break
            case botAction.r_hand_out:
                _servoMove(8, -90)
                break
            case botAction.r_hand_high:
                _servoMove(8, -135)
                break
            case botAction.r_hand_up:
                _servoMove(8, -180)
        }
        isInAction = false
    }

    function _servosDeltaSeq(seq: number[][]) {
        for (let i = 0; i < seq.length; i++)
            nexusbit.servosSlowTurnDeltaFromDefl(seq[i], 0)
    }

    //% block="Movement: %action" action.fieldEditor="gridpicker"
    export function robot_walk(action: botWalk) {
        isInAction = true
        switch (action) {
            case botWalk.forward:
                _servosDeltaSeq([
                    [null, null, 40, 15],
                    [-20, -20, null, null],
                    [null, null, -15, -40],
                    [20, 20, null, null],
                ])
                break
            case botWalk.backward:
                _servosDeltaSeq([
                    [null, null, 40, 15],
                    [20, 20, null, null],
                    [null, null, -15, -40],
                    [-20, -20, null, null],
                ])
                break
            case botWalk.left:
                _servosDeltaSeq([
                    [null, null, 40, 15],
                    [-20, 0, null, null],
                    [null, null, -15, -40],
                    [0, -20, null, null],
                ])
                break
            case botWalk.right:
                _servosDeltaSeq([
                    [null, null, -15, -40],
                    [0, 20, null, null],
                    [null, null, 40, 15],
                    [20, 0, null, null],
                ])
                break
            case botWalk.shuffle_left:
                _servosDeltaSeq([
                    [0, 0, -15, -40],
                    [null, null, 40, null],
                ])
                basic.pause(100)
                _servosDeltaSeq([
                    [null, null, null, 15],
                    [null, null, 0, 0]
                ])
                break
            case botWalk.shuffle_right:
                _servosDeltaSeq([
                    [0, 0, 40, 15],
                    [null, null, null, -40],
                ])
                basic.pause(100)
                _servosDeltaSeq([
                    [null, null, -15, null],
                    [null, null, 0, 0]
                ])
                break
            case botWalk.shuffle_forward:
                _servosDeltaSeq([
                    [null, null, 30, -30],
                    [-20, 20, null, null],
                    [null, null, 0, 0],
                    [0, 0, null, null]
                ])
                break
            case botWalk.shuffle_backward:
                _servosDeltaSeq([
                    [null, null, 30, -30],
                    [20, -20, null, null],
                    [null, null, 0, 0],
                    [0, 0, null, null]
                ])
        }
        isInAction = false
    }

    //% block="Heard sound ?"
    export function heardSound(): boolean {
        return nexusbit.micTriggered() && !isInAction
    }

    //% block="Detected object ?"
    export function detectedObj(): boolean {
        return nexusbit.sonarCheck(compareOpr.smaller, 10)
    }

    //% block="DC motor car %direction speed %speed" speed.min=0 speed.max=100 speed.defl=50 direction.fieldEditor="gridpicker" advanced=true
    export function robotCar(direction: carDir, speed: number) {
        nexusbit.DC_car(direction, carTurnMode.rotate, speed, speed)
    }

}

//% weight=15
namespace PCA9685 {
}
