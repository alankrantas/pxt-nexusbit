/**
* MakeCode editor extension For BBC micro:bit motor board "Nexus:bit" and Robot "NexusBot"
* from Taiwan Coding Education Association (https://www.beyond-coding.org.tw/)
* By Alan Wang, April 2019
*/

enum boardType {
    //% block="Nexus:bit"
    nexusbit,
    //% block="Thunder:bit"
    thunderbit,
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
    //% block="white"
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
    //% block="off"
    off,
}

enum servoDir {
    //% block="min"
    min,
    //% block="max"
    max,
}

enum dcDir {
    //% block="forward"
    forward,
    //% block="backward"
    backward,
    //% block="stop"
    stop,
}

enum dcMotor {
    //% block="P13/P14"
    P13_14,
    //% block="P15/P16"
    P15_16,
}

enum carDir {
    //% block="go forward"
    forward,
    //% block="go backward"
    backward,
    //% block="turn left"
    left,
    //% block="turn right"
    right,
    //% block="stop"
    stop,
}

enum carTurnMode {
    //% block="normal"
    normal = 0,
    //% block="rotate"
    rotate = 1,
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
    //% block="left leg inward"
    l_leg_in,
    //% block="right leg straight"
    r_leg_straight,
    //% block="right leg outward"
    r_leg_out,
    //% block="right leg inward"
    r_leg_in,
    //% block="left foot flat"
    l_foot_flat,
    //% block="left foot down"
    l_foot_down,
    //% block="left foot down more"
    l_foot_down_more,
    //% block="left foot up"
    l_foot_up,
    //% block="right foot flat"
    r_foot_flat,
    //% block="right foot down"
    r_foot_down,
    //% block="right foot down more"
    r_foot_down_more,
    //% block="right foot up"
    r_foot_up,
    //% block="left arm down"
    l_arm_down,
    //% block="left arm low"
    l_arm_low,
    //% block="left arm out"
    l_arm_out,
    //% block="left arm high"
    l_arm_high,
    //% block="left arm up"
    l_arm_up,
    //% block="right arm down"
    r_arm_down,
    //% block="right arm low"
    r_arm_low,
    //% block="right arm out"
    r_arm_out,
    //% block="right arm high"
    r_arm_high,
    //% block="right arm up"
    r_arm_up,
    //% block="left hand down"
    l_hand_down,
    //% block="left hand inward"
    l_hand_close,
    //% block="left hand low"
    l_hand_low,
    //% block="left hand out"
    l_hand_out,
    //% block="left hand high"
    l_hand_high,
    //% block="left hand up"
    l_hand_up,
    //% block="right hand down"
    r_hand_down,
    //% block="right hand inward"
    r_hand_close,
    //% block="right hand low"
    r_hand_low,
    //% block="right hand out"
    r_hand_out,
    //% block="right hand high"
    r_hand_high,
    //% block="right hand up"
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
}

//% weight=200 color=#009fb7 icon="\uf1aa" block="Nexus:bit"
namespace nexusbit {

    let _boardType: boardType = boardType.nexusbit
    let _joystickSen: number = joystickSen.normal
    let _servoNum: number = 12
    let _r_led_pin: number = 13
    let _g_led_pin: number = 14
    let _b_led_pin: number = 15
    let _initialized: boolean = false
    let _servoDefl: number[] = [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
    let _servoCurrent: number[] = [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
    let _servoMin: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let _servoMax: number[] = [180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180]
    let _servoDelta: number[] = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]

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
            _servoNum = 12
            _r_led_pin = 13
            _g_led_pin = 14
            _b_led_pin = 15
        } else {
            _servoNum = 4
            _r_led_pin = 9
            _g_led_pin = 10
            _b_led_pin = 11
        }
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

    //% block="Set joystick sensitivity %sen" sen.defl=joystickSen.normal group="2. Basic" advanced=true
    export function setJoystickSen(sen: joystickSen) {
        _joystickSen = sen
    }

    //% block="Joystick axis %axis analog value" group="2. Basic" advanced=true
    export function joystickReading(axis: joystickAxis): number {
        if (axis == joystickAxis.x) return pins.analogReadPin(AnalogPin.P1)
        else return pins.analogReadPin(AnalogPin.P2)
    }

    //% block="Ultrasonic distance (cm)" group="2. Basic" advanced=true
    export function sonarDistance(): number {
        return Math.constrain(sonar.ping(DigitalPin.P5, DigitalPin.P11, PingUnit.Centimeters), 0, 200)
    }

    //% block="Ultrasonic distance %compare %distance (cm) ?" distance.min=1 distance.max=200 distance.defl=15 group="2. Basic" advanced=true
    export function sonarCheck(compare: compareOpr, distance: number): boolean {
        let d: number = sonarDistance()
        if (d != 0) {
            d = Math.constrain(d, 2, 200)
            if (compare == compareOpr.smaller) return d < distance
            else return d > distance
        } else {
            return false
        }
    }

    //% block="Buzzer play (Hz) %freq duration %duration" freq.shadow="device_note" group="2. Basic"
    export function buzzer(freq: number, duration: number) {
        pins.analogPitch(freq, duration)
    }

    //% block="Mic triggered ?" group="2. Basic" advanced=true
    export function micTriggered(): boolean {
        return pins.digitalReadPin(DigitalPin.P12) == 1 && _boardType == boardType.nexusbit
    }

    //% block="Vibrator motor level %level duration %duration (ms)" level.shadow="speedPicker" duration.min=0 duration.defl=0 group="2. Basic"
    export function vibrator(level: number, duration: number) {
        if (level == 100) pins.digitalWritePin(DigitalPin.P8, 1)
        else pins.analogWritePin(AnalogPin.P8, Math.constrain(level, 0, 100) * 1023 / 100)
        if (duration > 0) {
            basic.pause(duration)
            pins.digitalWritePin(DigitalPin.P8, 0)
        }
    }

    //% block="P12 servo turn to %degree degree(s)" degree.shadow="protractorPicker" group="2. Basic"
    export function P12_servo(degree: number) {
        pins.servoWritePin(AnalogPin.P12, Math.constrain(degree, 0, 180))
    }

    //% block="P12 LED brightness level %level" level.shadow="speedPicker" level.defl=100 group="2. Basic" advanced=true
    export function P12_led(level: number) {
        pins.analogWritePin(AnalogPin.P12, Math.constrain(level, 0, 100) * 1023 / 100)
    }

    //% block="PCA9685 RGB LED set to|red = %r|green = %g|blue = %b" r.shadow="speedPicker" r.defl=100 g.shadow="speedPicker" g.defl=100 b.shadow="speedPicker" b.defl=100 group="3. PCA9685 RGB LED" blockExternalInputs=true
    export function rgb_led(r: number, g: number, b: number) {
        _initialize()
        PCA9685.setLedDutyCycle(_r_led_pin, 100 - Math.constrain(r, 0, 100), 64)
        PCA9685.setLedDutyCycle(_g_led_pin, 100 - Math.constrain(g, 0, 100), 64)
        PCA9685.setLedDutyCycle(_b_led_pin, 100 - Math.constrain(b, 0, 100), 64)
    }

    //% block="PCA9685 RGB LED set to %color brightness level %level" level.shadow="speedPicker" level.defl=100 color.fieldEditor="gridpicker" group="3. PCA9685 RGB LED"
    export function rgb_led_preset(color: colorType, level: number) {
        _initialize()
        switch (color) {
            case colorType.white:
                rgb_led(level, level, level)
                break
            case colorType.red:
                rgb_led(level, 0, 0)
                break
            case colorType.green:
                rgb_led(0, level, 0)
                break
            case colorType.blue:
                rgb_led(0, 0, level)
                break
            case colorType.yellow:
                rgb_led(level, level, 0)
                break
            case colorType.cyan:
                rgb_led(0, level, level)
                break
            case colorType.purple:
                rgb_led(level, 0, level)
                break
            case colorType.off:
                rgb_led(0, 0, 0)
        }
    }

    //% block="PCA9685 RGB LED set to random color" group="3. PCA9685 RGB LED" advanced=true
    export function rgb_led_random() {
        rgb_led(Math.randomRange(0, 100), Math.randomRange(0, 100), Math.randomRange(0, 100))
    }

    //% block="Set PCA9685 servo no. %servo|default position = %deflDegree|min degree(s) = %minDegree|max degree(s) = %maxDegree|movement degree(s) for gradually turning = %delta" servo.min=1 servo.max=12 servo.defl=1 deflDegree.shadow="protractorPicker" deflDegree.defl=90 minDegree.shadow="protractorPicker" minDegree.defl=0 maxDegree.shadow="protractorPicker" maxDegree.defl=180 delta.shadow="protractorPicker" delta.defl=5 group="4. PCA9685 Servos" advanced=true
    export function servoConfigure(servo: number, deflDegree: number, minDegree: number, maxDegree: number, delta: number) {
        if (servo <= _servoNum) {
            _servoMin[servo - 1] = Math.constrain(minDegree, 0, 180)
            if (Math.constrain(maxDegree, 0, 180) >= minDegree)
                _servoMax[servo - 1] = Math.constrain(maxDegree, 0, 180)
            else
                _servoMax[servo - 1] = _servoMin[servo - 1]
            _servoDefl[servo - 1] = Math.constrain(deflDegree, _servoMin[servo - 1], _servoMax[servo - 1])
            _servoDelta[servo - 1] = Math.constrain(delta, 0, 180)
        }
    }

    //% block="Adjust PCA9685 servos default from array %deflDegrees" group="4. PCA9685 Servos" advanced=true
    export function servosDeflAdjust(deflDegrees: number[]) {
        if (deflDegrees != null && deflDegrees.length <= _servoNum)
            for (let i = 0; i < deflDegrees.length; i++)
                _servoDefl[i] = Math.constrain(_servoDefl[i] + deflDegrees[i], _servoMin[i], _servoMax[i])
    }

    //% block="Set PCA9685 servos movement degree(s) from array %deltas" group="4. PCA9685 Servos" advanced=true
    export function servoSetDelta(deltas: number[]) {
        if (deltas != null && deltas.length <= _servoNum)
            for (let i = 0; i < deltas.length; i++)
                if (deltas[i] != null && deltas[i] > 0)
                    _servoDelta[i] = Math.constrain(deltas[i], 0, 180)
    }

    //% block="PCA9685 servo no. %servo turn to %degree degree(s)" servo.min=1 servo.max=12 servo.defl=1 degree.shadow="protractorPicker" degree.defl=90 group="4. PCA9685 Servos"
    export function servoTo(servo: number, degree: number) {
        _initialize()
        let newDegrees: number = Math.constrain(degree, _servoMin[servo - 1], _servoMax[servo - 1])
        if (servo <= _servoNum) {
            _servoCurrent[servo - 1] = newDegrees
            PCA9685.setServoPosition(servo, newDegrees, 64)
        }
    }

    //% block="PCA9685 servo no. %servo current degree(s)" servo.min=1 servo.max=12 servo.defl=1 deltaArray.min=0 deltaArray.max=180 deltaArray.defl=5 group="4. PCA9685 Servos" advanced=true
    export function getServoCurrent(servo: number): number {
        if (servo <= _servoNum)
            return _servoCurrent[servo - 1]
        else
            return 0
    }

    //% block="PCA9685 servo no. %servo turn to %direction degree(s)" servo.min=1 servo.max=12 servo.defl=1 group="4. PCA9685 Servos"
    export function servoToMinMax(servo: number, direction: servoDir) {
        if (direction == servoDir.min)
            servoTo(servo, _servoMin[servo - 1])
        else if (direction == servoDir.max)
            servoTo(servo, _servoMax[servo - 1])
    }

    //% block="PCA9685 servo no. %servo move %delta degree(s) from default" servo.min=1 servo.max=12 servo.defl=1 delta.min=-180 delta.max=180 delta.defl=0 group="4. PCA9685 Servos"
    export function servoDeltaFromDefl(servo: number, delta: number) {
        servoTo(servo, _servoDefl[servo - 1] + delta)
    }

    //% block="PCA9685 servo no. %servo gradually turn toward %degree degree(s)" servo.min=1 servo.max=12 servo.defl=1 degree.shadow="protractorPicker" degree.defl=90 group="4. PCA9685 Servos" advanced=true
    export function servoSlowTurn(servo: number, degree: number) {
        let target: number = Math.constrain(degree, _servoMin[servo - 1], _servoMax[servo - 1])
        let newDegree: number = _servoCurrent[servo - 1]
        if (Math.abs(target - _servoCurrent[servo - 1]) > 0 &&
            Math.abs(target - _servoCurrent[servo - 1]) <= _servoDelta[servo - 1]) {
            servoTo(servo, target)
        } else {
            if (target > _servoCurrent[servo - 1]) newDegree = _servoCurrent[servo - 1] + _servoDelta[servo - 1]
            else if (target < _servoCurrent[servo - 1]) newDegree = _servoCurrent[servo - 1] - _servoDelta[servo - 1]
            servoTo(servo, newDegree)
        }
    }

    //% block="PCA9685 servo no. %servo at %degree degree(s) %check ?" servo.min=1 servo.max=12 servo.defl=1 degree.shadow="protractorPicker" degree.defl=90 group="4. PCA9685 Servos" advanced=true
    export function ServoIsAtDegree(servo: number, degree: number, check: boolean) {
        if (check)
            return getServoCurrent(servo) == degree
        else
            return !(getServoCurrent(servo) == degree)
    }

    //% block="PCA9685 servo no. %servo gradually turn toward %direction degree(s)" servo.min=1 servo.max=12 servo.defl=1 group="4. PCA9685 Servos" advanced=true
    export function servoSlowTurnMinMax(servo: number, direction: servoDir) {
        if (direction == servoDir.min)
            servoSlowTurn(servo, _servoMin[servo - 1])
        else if (direction == servoDir.max)
            servoSlowTurn(servo, _servoMax[servo - 1])
    }

    //% block="PCA9685 servo no. %servo at %direction degree(s) %check ?" servo.min=1 servo.max=12 servo.defl=1 group="4. PCA9685 Servos" advanced=true
    export function ServoIsAtMinMax(servo: number, direction: servoDir, check: boolean) {
        if (direction == servoDir.min)
            return ServoIsAtDegree(servo, _servoMin[servo - 1], check)
        else
            return ServoIsAtDegree(servo, _servoMax[servo - 1], check)
    }

    //% block="PCA9685 servo no. %servo gradually move %delta degree(s) from default" servo.min=1 servo.max=12 servo.defl=1 delta.min=-180 delta.max=180 delta.defl=0 group="4. PCA9685 Servos" advanced=true
    export function servoSlowTurnDeltaFromDefl(servo: number, delta: number) {
        let target: number = Math.constrain(_servoDefl[servo - 1] + delta, _servoMin[servo - 1], _servoMax[servo - 1])
        let newDegree: number = _servoCurrent[servo - 1]
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
        let result: boolean = false
        let target: number = _servoDefl[servo - 1] + delta
        if (_servoCurrent[servo - 1] == target) result = true
        if (!check) result = !result
        return result
    }

    //% block="PCA9685 all servos gradually move|from default from array %deltas|turning delay (ms) = %delay|and wait at end (ms) = %delayEnd" delay.min=0 delayEnd.min=0 group="4. PCA9685 Servos" blockExternalInputs=true advanced=true
    export function servosSlowTurnDeltaFromDefl(deltas: number[], delay: number, delayEnd: number) {
        let check: boolean = true
        if (delay < 0) delay = 0
        if (delayEnd < 0) delayEnd = 0
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
                basic.pause(delay)
            }
            basic.pause(delayEnd)
        }
    }

    //% block="PCA9685 all servos gradually move %delta from default if not done" group="4. PCA9685 Servos" advanced=true
    export function servoSlowTurnDeltaFromDeflAndCheck(delta: number[]): boolean {
        let check: boolean = true
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
                    servoTo(i + 1, Math.constrain(degrees[i], 0, 180))
    }

    //% block="All PCA9685 servos move to degrees %deltas|from default and wait at end (ms) %delayEnd" group="4. PCA9685 Servos" blockExternalInputs=true
    export function servosToDeltaFromDefl(deltas: number[]) {
        if (deltas != null && deltas.length <= _servoNum)
            for (let i = 0; i < deltas.length; i++)
                if (deltas[i] != null)
                    servoTo(i + 1, Math.constrain(_servoDefl[i] + deltas[i], 0, 180))
    }

    //% block="(null)" group="4. PCA9685 Servos" advanced=true
    export function return_null(): number {
        return null
    }

    //% block="DC motor %motor direction %direction speed %speed" speed.shadow="speedPicker" speed.defl=100 group="5. DC/Stepper Motors"
    export function DC(motor: dcMotor, direction: dcDir, speed: number) {
        let digitalPin1: DigitalPin = DigitalPin.P0
        let digitalPin2: DigitalPin = DigitalPin.P0
        let analogPin1: AnalogPin = AnalogPin.P0
        let analogPin2: AnalogPin = AnalogPin.P0
        let notFullSpeed = speed < 100
        if (motor == dcMotor.P13_14) {
            digitalPin1 = DigitalPin.P13
            digitalPin2 = DigitalPin.P14
            analogPin1 = AnalogPin.P13
            analogPin2 = AnalogPin.P14
        } else if (motor == dcMotor.P15_16) {
            digitalPin1 = DigitalPin.P15
            digitalPin2 = DigitalPin.P16
            analogPin1 = AnalogPin.P15
            analogPin2 = AnalogPin.P16
        }
        switch (direction) {
            case dcDir.forward:
                if (notFullSpeed) {
                    if (speed == 0) pins.digitalWritePin(digitalPin1, 0)
                    else pins.analogWritePin(analogPin1, 1023 * speed / 100)
                } else {
                    pins.digitalWritePin(digitalPin1, 1)
                }
                pins.digitalWritePin(digitalPin2, 0)
                break
            case dcDir.backward:
                pins.digitalWritePin(digitalPin1, 0)
                if (notFullSpeed) {
                    if (speed == 0) pins.digitalWritePin(digitalPin2, 0)
                    else pins.analogWritePin(analogPin2, 1023 * speed / 100)
                } else {
                    pins.digitalWritePin(digitalPin2, 1)
                }
                break
            case dcDir.stop:
                pins.digitalWritePin(digitalPin1, 0)
                pins.digitalWritePin(digitalPin2, 0)
        }
    }

    //% block="2WD DC motor car|direction %direction|turn mode %mode|right motor speed %r_speed|left motor speed %l_speed" r_speed.shadow="speedPicker" r_speed.defl=100 l_speed.shadow="speedPicker" l_speed.defl=100 group="5. DC/Stepper Motors" blockExternalInputs=true advanced=true
    export function DC_car(direction: carDir, mode: carTurnMode, r_speed: number, l_speed: number) {
        switch (direction) {
            case carDir.forward:
                DC(dcMotor.P15_16, dcDir.forward, l_speed)
                DC(dcMotor.P13_14, dcDir.forward, r_speed)
                break
            case carDir.backward:
                DC(dcMotor.P15_16, dcDir.backward, l_speed)
                DC(dcMotor.P13_14, dcDir.backward, r_speed)
                break
            case carDir.left:
                if (mode == carTurnMode.normal)
                    DC(dcMotor.P15_16, dcDir.stop, l_speed)
                else if (mode == carTurnMode.rotate)
                    DC(dcMotor.P15_16, dcDir.backward, l_speed)
                DC(dcMotor.P13_14, dcDir.forward, r_speed)
                break
            case carDir.right:
                DC(dcMotor.P15_16, dcDir.forward, l_speed)
                if (mode == carTurnMode.normal)
                    DC(dcMotor.P13_14, dcDir.stop, r_speed)
                else if (mode == carTurnMode.rotate)
                    DC(dcMotor.P13_14, dcDir.backward, r_speed)
                break
            case carDir.stop:
                DC(dcMotor.P15_16, dcDir.stop, l_speed)
                DC(dcMotor.P13_14, dcDir.stop, r_speed)
        }
    }

    //% block="Stepper motor 1 step|IN1 = %pin1 IN2 = %pin2 IN3 = %pin3 IN4 = %pin4|direction %direction|cycle delay (us) = %delay" pin1.defl=DigitalPin.P13 pin2.defl=DigitalPin.P14 pin3.defl=DigitalPin.P15 pin4.defl=DigitalPin.P16 delay.min=2300 delay.defl=2300 group="5. DC/Stepper Motors"
    export function stepMotor(pin1: DigitalPin, pin2: DigitalPin, pin3: DigitalPin, pin4: DigitalPin, direction: steMotorDir, delay: number) {
        let pins_array: DigitalPin[] = [pin1, pin2, pin3, pin4]
        if (delay < 2300) delay = 2300
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let index: number = -1
                if (direction == steMotorDir.one)
                    index = j
                else if (direction == steMotorDir.two)
                    index = 3 - j
                if (i == j)
                    pins.digitalWritePin(pins_array[index], 1)
                else
                    pins.digitalWritePin(pins_array[index], 0)
            }
            control.waitMicros(delay)
        }
    }

    //% block="2WD stepper motor car 1 step|motor A IN1 = %pin1a|motor A IN2 = %pin2a|motor A IN3 = %pin3a|motor A IN4 = %pin4a|motor B IN1 = %pin1b|motor B IN2 = %pin2b|motor B IN3 = %pin3b|motor B IN4 = %pin4b|motor A direction %direction_1|motor B direction %direction_2|cycle delay (us) = %delay|disable LEDs %disable_led" pin1a.defl=DigitalPin.P6 pin2a.defl=DigitalPin.P7 pin3a.defl=DigitalPin.P9 pin4a.defl=DigitalPin.P10 pin1b.defl=DigitalPin.P13 pin2b.defl=DigitalPin.P14 pin3b.defl=DigitalPin.P15 pin4b.defl=DigitalPin.P16 delay.min=2300 delay.defl=2300 disable_led.defl=true group="5. DC/Stepper Motors" advanced=true
    export function stepMotorCar(pin1a: DigitalPin, pin2a: DigitalPin, pin3a: DigitalPin, pin4a: DigitalPin, pin1b: DigitalPin, pin2b: DigitalPin, pin3b: DigitalPin, pin4b: DigitalPin, direction_1: steMotorDir, direction_2: steMotorDir, delay: number, disable_led: boolean) {
        let pins_array_1: DigitalPin[] = [pin1a, pin2a, pin3a, pin4a]
        let pins_array_2: DigitalPin[] = [pin1b, pin2b, pin3b, pin4b]
        led.enable(!disable_led)
        if (delay < 2300) delay = 2300
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let index_1: number = -1
                let index_2: number = -1
                if (direction_1 == steMotorDir.one)
                    index_1 = j
                else if (direction_1 == steMotorDir.two)
                    index_1 = 3 - j
                if (direction_2 == steMotorDir.one)
                    index_2 = j
                else if (direction_2 == steMotorDir.two)
                    index_2 = 3 - j
                if (i == j) {
                    pins.digitalWritePin(pins_array_1[index_1], 1)
                    pins.digitalWritePin(pins_array_2[index_2], 1)
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

    let calibrated: boolean = false
    let isInAction: boolean = false

    //% block="Servos calibration|(degree from default:)|Left leg %servo1|Right leg %servo2|Left foot %servo3|Right foot %servo4|Left arm %servo5|Right arm %servo6|Left hand %servo7|Right hand %servo8|then stand still %stand_still" servo1.min=-180 servo1.max=180 servo1.defl=0 servo2.min=-180 servo2.max=180 servo2.defl=0 servo3.min=-180 servo1.max=180 servo3.defl=0 servo4.min=-180 servo1.max=180 servo4.defl=0 servo5.min=-180 servo1.max=180 servo5.defl=0 servo6.min=-180 servo1.max=180 servo6.defl=0 servo7.min=-180 servo1.max=180 servo7.defl=0 servo8.min=-180 servo1.max=180 servo8.defl=0 standstill.defl=true
    export function robotCalibrate(servo1: number, servo2: number, servo3: number, servo4: number, servo5: number, servo6: number, servo7: number, servo8: number, stand_still: boolean) {
        nexusbit.servosDeflAdjust([servo1, servo2, servo3, servo4, servo5 + 90, servo6 - 90, servo7 - 90, servo8 + 90])
        calibrated = true
        if (stand_still) {
            robotStandstill()
            basic.pause(500)
        }
    }

    //% block="Servos gradual turn speed %speed" speed.min=1 speed.max=10 speed.defl=5
    export function robotSpeed(speed: number) {
        nexusbit.servoSetDelta([speed, speed, speed, speed, speed, speed, speed, speed])
    }

    //% block="Heard sound ?"
    export function heardSound(): boolean {
        return nexusbit.micTriggered() && !isInAction
    }

    //% block="Detected object ?"
    export function detectedObj(): boolean {
        return nexusbit.sonarCheck(compareOpr.smaller, 10)
    }

    //% block="Stand still"
    export function robotStandstill() {
        if (calibrated) nexusbit.servosToDefl()
    }

    function _servo_move(servo: number, degree: number) {
        nexusbit.servoDeltaFromDefl(servo, degree)
    }

    function _servos_delta(array: number[], delay: number, delay_end: number) {
        nexusbit.servosSlowTurnDeltaFromDefl(array, delay, delay_end)
    }

    function _servos_delta_seq(array: number[][]) {
        for (let i = 0; i < array.length; i++) _servos_delta(array[i], 0, 0)
    }

    //% block="Action: %action" action.fieldEditor="gridpicker"
    export function robotAction(action: botAction) {
        isInAction = true
        switch (action) {
            case botAction.l_leg_straight:
                _servo_move(1, 0)
                break
            case botAction.l_leg_out:
                _servo_move(1, -20)
                break
            case botAction.l_leg_in:
                _servo_move(1, 20)
                break
            case botAction.r_leg_straight:
                _servo_move(2, 0)
                break
            case botAction.r_leg_out:
                _servo_move(2, 20)
                break
            case botAction.r_leg_in:
                _servo_move(2, -20)
                break
            case botAction.l_foot_flat:
                _servo_move(3, 0)
                break
            case botAction.l_foot_down:
                _servo_move(3, 15)
                break
            case botAction.l_foot_down_more:
                _servo_move(3, 40)
                break
            case botAction.l_foot_up:
                _servo_move(3, -15)
                break
            case botAction.r_foot_flat:
                _servo_move(4, 0)
                break
            case botAction.r_foot_down:
                _servo_move(4, -15)
                break
            case botAction.r_foot_down_more:
                _servo_move(4, -40)
                break
            case botAction.r_foot_up:
                _servo_move(4, 15)
                break
            case botAction.l_arm_down:
                _servo_move(5, 0)
                break
            case botAction.l_arm_low:
                _servo_move(5, -45)
                break
            case botAction.l_arm_out:
                _servo_move(5, -90)
                break
            case botAction.l_arm_high:
                _servo_move(5, -135)
                break
            case botAction.l_arm_up:
                _servo_move(5, -180)
                break
            case botAction.r_arm_down:
                _servo_move(6, 0)
                break
            case botAction.r_arm_low:
                _servo_move(6, 45)
                break
            case botAction.r_arm_out:
                _servo_move(6, 90)
                break
            case botAction.r_arm_high:
                _servo_move(6, 135)
                break
            case botAction.r_arm_up:
                _servo_move(6, 180)
                break
            case botAction.l_hand_down:
                _servo_move(7, 0)
                break
            case botAction.l_hand_close:
                _servo_move(7, -15)
                break
            case botAction.l_hand_low:
                _servo_move(7, 45)
                break
            case botAction.l_hand_out:
                _servo_move(7, 90)
                break
            case botAction.l_hand_high:
                _servo_move(7, 135)
                break
            case botAction.l_hand_up:
                _servo_move(7, 180)
                break
            case botAction.r_hand_down:
                _servo_move(8, 0)
                break
            case botAction.r_hand_close:
                _servo_move(8, 15)
                break
            case botAction.r_hand_low:
                _servo_move(8, -45)
                break
            case botAction.r_hand_out:
                _servo_move(8, -90)
                break
            case botAction.r_hand_high:
                _servo_move(8, -135)
                break
            case botAction.r_hand_up:
                _servo_move(8, -180)
        }
        isInAction = false
    }

}

//% weight=15
namespace PCA9685 {
}
