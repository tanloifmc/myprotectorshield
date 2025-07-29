import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Mic, MicOff, Volume2 } from 'lucide-react'

const ListeningToggle = ({ isListening, onToggle }) => {
  const [showInfo, setShowInfo] = useState(false)

  const handleToggle = () => {
    if (!isListening) {
      setShowInfo(true)
    } else {
      onToggle()
    }
  }

  const handleConfirm = () => {
    setShowInfo(false)
    onToggle()
  }

  const handleCancel = () => {
    setShowInfo(false)
  }

  if (showInfo) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
        <div className="text-center mb-4">
          <Mic className="mx-auto mb-2 text-blue-600" size={32} />
          <h3 className="text-lg font-semibold text-blue-800">
            Bật Chế độ Lắng nghe?
          </h3>
        </div>
        
        <div className="text-sm text-gray-700 space-y-3 mb-6">
          <p>
            Khi bật, MyProtector Shield sẽ sử dụng micro để chạy nền và lắng nghe 
            các từ khóa khẩn cấp (ví dụ: "Cứu tôi") ngay cả khi bạn đã tắt màn hình.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="font-medium text-yellow-800 mb-2">Tính năng này rất hữu ích khi:</p>
            <ul className="text-yellow-700 text-xs space-y-1">
              <li>• Đi một mình ở nơi vắng vẻ</li>
              <li>• Ngủ một mình và lo sợ sự cố sức khỏe</li>
              <li>• Đi vào khu vực có rủi ro (leo núi, đi rừng)</li>
            </ul>
          </div>
          
          <p className="text-xs text-gray-600">
            <strong>Lưu ý:</strong> Việc chạy nền có thể tiêu thụ nhiều pin hơn bình thường. 
            Chúng tôi cam kết không ghi âm hay lưu trữ bất cứ điều gì cho đến khi nghe thấy từ khóa khẩn cấp.
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            onClick={handleCancel}
            variant="outline" 
            className="flex-1"
          >
            Hủy
          </Button>
          <Button 
            onClick={handleConfirm}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Đồng ý & Bật
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Button
        onClick={handleToggle}
        variant={isListening ? "default" : "outline"}
        className={`
          w-full py-4 text-base font-medium transition-all duration-200
          ${isListening 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'border-2 border-gray-300 hover:border-blue-400 text-gray-700'
          }
        `}
      >
        <div className="flex items-center justify-center space-x-3">
          {isListening ? (
            <>
              <div className="flex items-center space-x-2">
                <Volume2 size={20} className="animate-pulse" />
                <span>Đang lắng nghe...</span>
              </div>
            </>
          ) : (
            <>
              <MicOff size={20} />
              <span>Bật Chế độ Lắng nghe</span>
            </>
          )}
        </div>
      </Button>
      
      {isListening && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Từ khóa: "Cứu tôi", "Help me"</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListeningToggle

