import { useRef, useState } from 'react'

export const useTimer = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds)
  const [timeUp, setTimeUp] = useState<boolean>(false)
  const intervalRef = useRef<number>()
  let now: number
  let endTimestamp: number

  const reset = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setTimeLeft(seconds)
    setTimeUp(false)
    now = Date.now()
    endTimestamp = now + seconds * 1000
  }

  const start = () => {
    if (intervalRef.current) return
    reset()

    intervalRef.current = window.setInterval(() => {
      const secondsLeft = Math.round((endTimestamp - Date.now()) / 1000)
      if (secondsLeft >= 0) {
        setTimeLeft(secondsLeft)
      } else {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setTimeUp(true)
      }
    }, 1000)
  }


  return {
    timeLeft,
    start,
    reset,
    timeUp,
  }
}
