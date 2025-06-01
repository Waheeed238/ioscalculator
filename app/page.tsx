"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const percentage = () => {
    const value = Number.parseFloat(display)
    setDisplay(String(value / 100))
  }

  const toggleSign = () => {
    const value = Number.parseFloat(display)
    setDisplay(String(value * -1))
  }

  const formatDisplay = (value: string) => {
    if (value.length > 9) {
      return Number.parseFloat(value).toExponential(3)
    }
    return value
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-black rounded-3xl p-6 shadow-2xl">
          {/* Display */}
          <div className="mb-4 p-4 text-right">
            <div className="text-white text-6xl font-light leading-none overflow-hidden">{formatDisplay(display)}</div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <Button
              onClick={clear}
              className="aspect-square h-auto w-full text-black text-2xl font-medium bg-gray-300 hover:bg-gray-200 rounded-full"
            >
              AC
            </Button>
            <Button
              onClick={toggleSign}
              className="aspect-square h-auto w-full text-black text-2xl font-medium bg-gray-300 hover:bg-gray-200 rounded-full"
            >
              +/-
            </Button>
            <Button
              onClick={percentage}
              className="aspect-square h-auto w-full text-black text-2xl font-medium bg-gray-300 hover:bg-gray-200 rounded-full"
            >
              %
            </Button>
            <Button
              onClick={() => performOperation("÷")}
              className="aspect-square h-auto w-full text-white text-3xl font-light bg-orange-500 hover:bg-orange-400 rounded-full"
            >
              ÷
            </Button>

            {/* Row 2 */}
            <Button
              onClick={() => inputNumber("7")}
              className="aspect-square h-auto w-full text-white text-2xl font-light bg-gray-600 hover:bg-gray-500 rounded-full"
            >
              7
            </Button>
            <Button
              onClick={() => inputNumber("8")}
              className="aspect-square h-auto w-full text-white text-2xl font-light bg-gray-600 hover:bg-gray-500 rounded-full"
            >
              8
            </Button>
            <Button
              onClick={() => inputNumber("9")}
              className="aspect-square h-auto w-full text-white text-2xl font-light bg-gray-600 hover:bg-gray-500 rounded-full"
            >
              9
            </Button>
            <Button
              onClick={() => performOperation("×")}
              className="aspect-square h-auto w-full text-white text-3xl font-light bg-orange-500 hover:bg-orange-400 rounded-full"
            >
              ×
            </Button>

            {/* Row 3 */}
            <Button
              onClick={() => inputNumber("4")}
              className="aspect-square h-auto w-full text-white text-2xl font-light bg-gray-600 hover:bg-gray-500 rounded-full"
            >
              4
            </Button>
            <Button
              onClick={() => inputNumber("5")}
              className="aspect-square h-auto w-full text-white text-2xl font-light bg-gray-600 hover:bg-gray-500 rounded-full"
            >
              5
            </Button>
            <Button
              onClick={() => inputNumber("6")}
              className="aspect-square h-auto w-full text-white text-2xl font-light bg-gray-600 hover:bg-gray-500 rounded-full"
            >
              6
            </Button>
            <Button
              onClick={() => performOperation("-")}
              className="aspect-square h-auto w-full text-white text-3xl font-light bg-orange-500 hover:bg-orange-400 rounded-full"
            >
              -
            </Button>

            {/* Row 4 */}
            <Button
              onClick={() => inputNumber("1")}
              className="aspect-square h-auto w-full text-white text-2xl font-light bg-gray-600 hover:bg-gray-500 rounded-full"
            >
              1
            </Button>
            <Button
              onClick={() => inputNumber("2")}
              className="aspect-square h-auto w-full text-white text-2xl font-light bg-gray-600 hover:bg-gray-500 rounded-full"
            >
              2
            </Button>
            <Button
              onClick={() => inputNumber("3")}
              className="aspect-square h-auto w-full text-white text-2xl font-light bg-gray-600 hover:bg-gray-500 rounded-full"
            >
              3
            </Button>
            <Button
              onClick={() => performOperation("+")}
              className="aspect-square h-auto w-full text-white text-3xl font-light bg-orange-500 hover:bg-orange-400 rounded-full"
            >
              +
            </Button>

            {/* Row 5 */}
            <Button
              onClick={() => inputNumber("0")}
              className="col-span-2 aspect-[2/1] h-auto w-full text-white text-2xl font-light bg-gray-600 hover:bg-gray-500 rounded-full"
            >
              0
            </Button>
            <Button
              onClick={inputDecimal}
              className="aspect-square h-auto w-full text-white text-2xl font-light bg-gray-600 hover:bg-gray-500 rounded-full"
            >
              .
            </Button>
            <Button
              onClick={() => performOperation("=")}
              className="aspect-square h-auto w-full text-white text-3xl font-light bg-orange-500 hover:bg-orange-400 rounded-full"
            >
              =
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
