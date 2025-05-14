import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

const WinnerCelebration: React.FC = () => {
  const { width, height } = useWindowSize()
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <Confetti
        width={width}
        height={height}
        numberOfPieces={500}
        recycle={false}
        gravity={0.3}
        wind={0.01}
      />
    </div>
  )
}

export default WinnerCelebration
