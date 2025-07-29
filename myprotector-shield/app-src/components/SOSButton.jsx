import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { AlertTriangle, Phone } from 'lucide-react'

const SOSButton = ({ onActivate, isListening }) => {
  const [isPressed, setIsPressed] = useState(false)
  const [countdown, setCountdown] = useState(null)

  const handleSOSPress = () => {
    setIsPressed(true)
    setCountdown(3)
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsPressed(false)
          setCountdown(null)
          onActivate()
          return null
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleCancel = () => {
    setIsPressed(false)
    setCountdown(null)
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Main SOS Button */}
      <div className="relative">
        <Button
          onClick={handleSOSPress}
          disabled={isPressed}
          className={`
            w-40 h-40 rounded-full text-white font-bold text-xl
            transition-all duration-200 shadow-lg
            ${isPressed 
              ? 'bg-red-600 scale-95' 
              : 'bg-red-500 hover:bg-red-600 hover:scale-105'
            }
          `}
        >
          {isPressed ? (
            <div className="flex flex-col items-center">
              <AlertTriangle size={32} className="mb-2" />
              <span className="text-2xl font-bold">{countdown}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Phone size={32} className="mb-2" />
              <span>SOS</span>
            </div>
          )}
        </Button>
        
        {/* Pulse animation when listening */}
        {isListening && (
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-30 animate-ping"></div>
        )}
      </div>

      {/* Cancel Button */}
      {isPressed && (
        <Button
          onClick={handleCancel}
          variant="outline"
          className="px-8 py-3 text-lg font-semibold border-2 border-gray-400 hover:border-gray-600"
        >
          HỦY
        </Button>
      )}

      {/* Status Text */}
      <div className="text-center">
        {isPressed ? (
          <p className="text-red-600 font-semibold">
            Đang kích hoạt SOS trong {countdown} giây...
          </p>
        ) : isListening ? (
          <p className="text-blue-600 font-semibold">
            🎤 Đang lắng nghe từ khóa khẩn cấp
          </p>
        ) : (
          <p className="text-gray-600">
            Nhấn nút SOS để kích hoạt báo động khẩn cấp
          </p>
        )}
      </div>
    </div>
  )
}

export default SOSButton

