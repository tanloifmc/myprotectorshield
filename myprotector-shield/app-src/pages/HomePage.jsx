import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import SOSButton from '../components/SOSButton'
import VoiceRecognition from '../components/VoiceRecognition'
import EvidenceRecorder from '../components/EvidenceRecorder'
import { 
  Shield, 
  Lock, 
  Wifi, 
  Heart,
  Mic,
  Camera,
  Phone,
  MessageSquare,
  MapPin,
  Volume2
} from 'lucide-react'

const HomePage = () => {
  const [isListening, setIsListening] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [sosActive, setSosActive] = useState(false)
  const [triggerInfo, setTriggerInfo] = useState(null)
  const [activeTab, setActiveTab] = useState('main')

  const handleSOSTrigger = (info) => {
    setSosActive(true)
    setTriggerInfo(info)
    setIsRecording(true)
    
    // Simulate emergency actions
    console.log('🚨 SOS Triggered:', info)
    
    // Auto-stop after 5 minutes (300 seconds) for demo
    setTimeout(() => {
      if (isRecording) {
        handleStopRecording()
      }
    }, 300000)
  }

  const handleVoiceTrigger = (info) => {
    handleSOSTrigger(info)
  }

  const handleStopSOS = () => {
    setSosActive(false)
    setIsRecording(false)
    setTriggerInfo(null)
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    setTriggerInfo({
      method: 'manual',
      timestamp: new Date().toISOString()
    })
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setTriggerInfo(null)
  }

  const toggleListening = () => {
    setIsListening(!isListening)
  }

  const getStatusColor = () => {
    if (sosActive) return 'text-red-600'
    if (isRecording) return 'text-orange-600'
    if (isListening) return 'text-purple-600'
    return 'text-green-600'
  }

  const getStatusText = () => {
    if (sosActive) return 'SOS ĐANG HOẠT ĐỘNG'
    if (isRecording) return 'Đang ghi bằng chứng'
    if (isListening) return 'Đang lắng nghe'
    return 'Sẵn sàng bảo vệ'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:ml-64">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="text-blue-600" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">MyProtector Shield</h1>
              <p className="text-gray-600">Người vệ sĩ riêng tư của bạn</p>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
            sosActive ? 'bg-red-100' : 
            isRecording ? 'bg-orange-100' :
            isListening ? 'bg-purple-100' : 'bg-green-100'
          }`}>
            <div className={`w-3 h-3 rounded-full ${
              sosActive ? 'bg-red-600 animate-pulse' :
              isRecording ? 'bg-orange-600 animate-pulse' :
              isListening ? 'bg-purple-600 animate-pulse' : 'bg-green-600'
            }`} />
            <span className={`font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('main')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'main' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Trang chính
            </button>
            <button
              onClick={() => setActiveTab('voice')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'voice' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Giọng nói
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'evidence' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Bằng chứng
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'main' && (
          <div className="space-y-8">
            {/* SOS Button */}
            <div className="text-center">
              <SOSButton onTrigger={handleSOSTrigger} disabled={sosActive} />
              <p className="text-gray-600 mt-4">
                Nhấn nút SOS để kích hoạt báo động khẩn cấp
              </p>
              
              {sosActive && (
                <div className="mt-6">
                  <Button
                    onClick={handleStopSOS}
                    variant="outline"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Dừng SOS
                  </Button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isListening ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <Mic className={isListening ? 'text-purple-600' : 'text-gray-600'} size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Chế độ Lắng nghe</h3>
                    <p className="text-sm text-gray-600">
                      {isListening ? 'Đang lắng nghe từ khóa' : 'Tắt'}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={toggleListening}
                  className={`w-full ${
                    isListening 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  {isListening ? 'Tắt Chế độ Lắng nghe' : 'Bật Chế độ Lắng nghe'}
                </Button>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isRecording ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    <Camera className={isRecording ? 'text-red-600' : 'text-gray-600'} size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Ghi Bằng chứng</h3>
                    <p className="text-sm text-gray-600">
                      {isRecording ? 'Đang ghi âm/video' : 'Sẵn sàng'}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`w-full ${
                    isRecording 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isRecording ? 'Dừng ghi' : 'Bắt đầu ghi'}
                </Button>
              </div>
            </div>

            {/* Core Principles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wifi className="text-green-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Offline First</h3>
                <p className="text-sm text-gray-600">
                  Hoạt động hoàn toàn không cần internet
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="text-blue-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Privacy First</h3>
                <p className="text-sm text-gray-600">
                  100% riêng tư, không thu thập dữ liệu
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-purple-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Simple First</h3>
                <p className="text-sm text-gray-600">
                  Đơn giản, dễ dùng khi khẩn cấp
                </p>
              </div>
            </div>

            {/* Emergency Actions Preview */}
            {(sosActive || isRecording) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 mb-4">🚨 Hành động khẩn cấp đang thực hiện:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2 text-red-700">
                    <Phone size={16} />
                    <span className="text-sm">Gọi liên hệ</span>
                  </div>
                  <div className="flex items-center space-x-2 text-red-700">
                    <MessageSquare size={16} />
                    <span className="text-sm">Gửi SMS</span>
                  </div>
                  <div className="flex items-center space-x-2 text-red-700">
                    <MapPin size={16} />
                    <span className="text-sm">Chia sẻ vị trí</span>
                  </div>
                  <div className="flex items-center space-x-2 text-red-700">
                    <Volume2 size={16} />
                    <span className="text-sm">Phát cảnh báo</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'voice' && (
          <VoiceRecognition
            isListening={isListening}
            onTrigger={handleVoiceTrigger}
            onToggle={toggleListening}
          />
        )}

        {activeTab === 'evidence' && (
          <EvidenceRecorder
            isRecording={isRecording}
            onStart={handleStartRecording}
            onStop={handleStopRecording}
            triggerInfo={triggerInfo}
          />
        )}
      </div>
    </div>
  )
}

export default HomePage

