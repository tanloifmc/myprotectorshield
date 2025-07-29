import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { 
  Mic, 
  MicOff, 
  Volume2, 
  AlertTriangle, 
  CheckCircle,
  Settings,
  Play,
  Square
} from 'lucide-react'

const VoiceRecognition = ({ isListening, onTrigger, onToggle }) => {
  const [isSupported, setIsSupported] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [keywords, setKeywords] = useState(['cứu tôi', 'help me', 'emergency', 'khẩn cấp'])
  const [sensitivity, setSensitivity] = useState(0.7)
  const [showSettings, setShowSettings] = useState(false)
  const [lastTrigger, setLastTrigger] = useState(null)
  
  const recognitionRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setIsSupported(true)
      
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'vi-VN'
      
      recognition.onstart = () => {
        setIsRecording(true)
        console.log('Voice recognition started')
      }
      
      recognition.onend = () => {
        setIsRecording(false)
        console.log('Voice recognition ended')
        
        // Restart if still listening
        if (isListening) {
          setTimeout(() => {
            try {
              recognition.start()
            } catch (error) {
              console.log('Recognition restart failed:', error)
            }
          }, 1000)
        }
      }
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
      }
      
      recognition.onresult = (event) => {
        let finalTranscript = ''
        let interimTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          const confidence = event.results[i][0].confidence
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript
            setConfidence(confidence || 0.8)
          } else {
            interimTranscript += transcript
          }
        }
        
        const fullTranscript = (finalTranscript + interimTranscript).toLowerCase()
        setTranscript(fullTranscript)
        
        // Check for keywords
        if (finalTranscript) {
          checkForKeywords(finalTranscript.toLowerCase(), event.results[event.resultIndex][0].confidence || 0.8)
        }
      }
      
      recognitionRef.current = recognition
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isSupported && recognitionRef.current) {
      if (isListening && !isRecording) {
        try {
          recognitionRef.current.start()
        } catch (error) {
          console.log('Recognition start failed:', error)
        }
      } else if (!isListening && isRecording) {
        recognitionRef.current.stop()
      }
    }
  }, [isListening, isSupported])

  const checkForKeywords = (text, confidence) => {
    if (confidence < sensitivity) return
    
    const foundKeyword = keywords.find(keyword => 
      text.includes(keyword.toLowerCase())
    )
    
    if (foundKeyword) {
      setLastTrigger({
        keyword: foundKeyword,
        confidence: confidence,
        timestamp: new Date().toLocaleTimeString(),
        text: text
      })
      
      // Trigger SOS
      onTrigger({
        method: 'voice',
        keyword: foundKeyword,
        confidence: confidence,
        transcript: text
      })
    }
  }

  const addKeyword = (keyword) => {
    if (keyword.trim() && !keywords.includes(keyword.trim().toLowerCase())) {
      setKeywords([...keywords, keyword.trim().toLowerCase()])
    }
  }

  const removeKeyword = (keyword) => {
    setKeywords(keywords.filter(k => k !== keyword))
  }

  const testVoiceRecognition = () => {
    if (!isSupported) return
    
    // Simulate voice trigger for testing
    const testKeyword = keywords[0]
    setLastTrigger({
      keyword: testKeyword,
      confidence: 0.95,
      timestamp: new Date().toLocaleTimeString(),
      text: `test: ${testKeyword}`
    })
    
    alert(`🎤 Test thành công!\nTừ khóa: "${testKeyword}"\nĐộ tin cậy: 95%`)
  }

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="text-yellow-600 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-1">
              Trình duyệt không hỗ trợ
            </h3>
            <p className="text-sm text-yellow-700">
              Trình duyệt của bạn không hỗ trợ nhận diện giọng nói. 
              Vui lòng sử dụng Chrome, Edge hoặc Safari để có trải nghiệm tốt nhất.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Control */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isListening ? 'bg-purple-100' : 'bg-gray-100'
            }`}>
              {isListening ? (
                <Mic className="text-purple-600" size={24} />
              ) : (
                <MicOff className="text-gray-600" size={24} />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Chế độ Lắng nghe Giọng nói
              </h3>
              <p className="text-sm text-gray-600">
                {isListening ? 'Đang lắng nghe từ khóa khẩn cấp...' : 'Tắt'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings size={16} />
            </Button>
            <Button
              onClick={onToggle}
              className={`${
                isListening 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {isListening ? 'Tắt' : 'Bật'}
            </Button>
          </div>
        </div>
        
        {/* Status Indicator */}
        {isListening && (
          <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'
              }`} />
              <span className="text-sm font-medium text-purple-800">
                {isRecording ? 'Đang ghi âm' : 'Chờ kích hoạt'}
              </span>
            </div>
            
            {transcript && (
              <div className="flex-1 text-sm text-purple-700">
                <span className="font-medium">Nghe được:</span> "{transcript}"
              </div>
            )}
            
            {confidence > 0 && (
              <div className="text-sm text-purple-600">
                Độ tin cậy: {Math.round(confidence * 100)}%
              </div>
            )}
          </div>
        )}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Cài đặt Nhận diện Giọng nói</h4>
          
          <div className="space-y-6">
            {/* Sensitivity */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Độ nhạy nhận diện
                </label>
                <span className="text-sm text-gray-600">
                  {Math.round(sensitivity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.3"
                max="1"
                step="0.1"
                value={sensitivity}
                onChange={(e) => setSensitivity(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Thấp (ít nhạy)</span>
                <span>Cao (rất nhạy)</span>
              </div>
            </div>
            
            {/* Keywords Management */}
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-3">
                Từ khóa kích hoạt ({keywords.length})
              </h5>
              <div className="space-y-2">
                {keywords.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-800">
                      "{keyword}"
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeKeyword(keyword)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Xóa
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 flex space-x-2">
                <input
                  type="text"
                  placeholder="Thêm từ khóa mới..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addKeyword(e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={testVoiceRecognition}
                  className="text-purple-600 border-purple-300 hover:bg-purple-50"
                >
                  <Play size={16} className="mr-1" />
                  Test
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Last Trigger Info */}
      {lastTrigger && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="text-green-600 mt-0.5" size={20} />
            <div>
              <h4 className="font-semibold text-green-800 mb-1">
                Kích hoạt thành công lần cuối
              </h4>
              <div className="text-sm text-green-700 space-y-1">
                <p><span className="font-medium">Từ khóa:</span> "{lastTrigger.keyword}"</p>
                <p><span className="font-medium">Thời gian:</span> {lastTrigger.timestamp}</p>
                <p><span className="font-medium">Độ tin cậy:</span> {Math.round(lastTrigger.confidence * 100)}%</p>
                <p><span className="font-medium">Nội dung:</span> "{lastTrigger.text}"</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Hướng dẫn sử dụng</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Bật chế độ lắng nghe trước khi đi ra ngoài hoặc khi ngủ một mình</li>
          <li>• Nói rõ ràng và to một trong các từ khóa đã cài đặt</li>
          <li>• Ứng dụng sẽ tự động kích hoạt SOS khi nhận diện được từ khóa</li>
          <li>• Điều chỉnh độ nhạy phù hợp với môi trường xung quanh</li>
          <li>• Thử nghiệm thường xuyên để đảm bảo hoạt động tốt</li>
        </ul>
      </div>
    </div>
  )
}

export default VoiceRecognition

