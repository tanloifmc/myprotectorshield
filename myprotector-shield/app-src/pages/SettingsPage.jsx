import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { 
  Settings, 
  Volume2, 
  VolumeX, 
  Mic, 
  Camera, 
  MapPin, 
  Shield, 
  Bell,
  Smartphone,
  Info,
  ChevronRight,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    soundEnabled: true,
    vibrationEnabled: true,
    autoRecord: true,
    locationSharing: true,
    voiceActivation: false,
    fakeCallEnabled: true,
    emergencyVolume: 100,
    recordingQuality: 'high'
  })

  const [customKeywords, setCustomKeywords] = useState(['Cứu tôi', 'Help me'])
  const [newKeyword, setNewKeyword] = useState('')
  const [showKeywordForm, setShowKeywordForm] = useState(false)

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleVolumeChange = (value) => {
    setSettings(prev => ({
      ...prev,
      emergencyVolume: value
    }))
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !customKeywords.includes(newKeyword.trim())) {
      setCustomKeywords([...customKeywords, newKeyword.trim()])
      setNewKeyword('')
      setShowKeywordForm(false)
    }
  }

  const removeKeyword = (keyword) => {
    setCustomKeywords(customKeywords.filter(k => k !== keyword))
  }

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button onClick={onToggle} className="focus:outline-none">
      {enabled ? (
        <ToggleRight className="text-blue-600" size={24} />
      ) : (
        <ToggleLeft className="text-gray-400" size={24} />
      )}
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:ml-64">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Settings className="text-gray-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Cài đặt</h1>
              <p className="text-gray-600">Tùy chỉnh ứng dụng theo nhu cầu của bạn</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Emergency Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="mr-2 text-red-600" size={20} />
              Cài đặt Khẩn cấp
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Âm thanh báo động</h3>
                  <p className="text-sm text-gray-600">Phát còi báo động khi kích hoạt SOS</p>
                </div>
                <ToggleSwitch 
                  enabled={settings.soundEnabled} 
                  onToggle={() => toggleSetting('soundEnabled')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Rung</h3>
                  <p className="text-sm text-gray-600">Rung mạnh khi kích hoạt SOS</p>
                </div>
                <ToggleSwitch 
                  enabled={settings.vibrationEnabled} 
                  onToggle={() => toggleSetting('vibrationEnabled')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Cuộc gọi giả</h3>
                  <p className="text-sm text-gray-600">Hiển thị cuộc gọi giả từ cảnh sát</p>
                </div>
                <ToggleSwitch 
                  enabled={settings.fakeCallEnabled} 
                  onToggle={() => toggleSetting('fakeCallEnabled')} 
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">Âm lượng khẩn cấp</h3>
                  <span className="text-sm text-gray-600">{settings.emergencyVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.emergencyVolume}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Recording Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Camera className="mr-2 text-green-600" size={20} />
              Ghi bằng chứng
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Tự động ghi âm/video</h3>
                  <p className="text-sm text-gray-600">Tự động ghi lại bằng chứng khi SOS</p>
                </div>
                <ToggleSwitch 
                  enabled={settings.autoRecord} 
                  onToggle={() => toggleSetting('autoRecord')} 
                />
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Chất lượng ghi</h3>
                <select
                  value={settings.recordingQuality}
                  onChange={(e) => setSettings(prev => ({...prev, recordingQuality: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Thấp (tiết kiệm dung lượng)</option>
                  <option value="medium">Trung bình</option>
                  <option value="high">Cao (khuyến nghị)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Voice Activation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Mic className="mr-2 text-blue-600" size={20} />
              Kích hoạt bằng giọng nói
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Cho phép kích hoạt bằng giọng nói</h3>
                  <p className="text-sm text-gray-600">Lắng nghe từ khóa khi bật chế độ lắng nghe</p>
                </div>
                <ToggleSwitch 
                  enabled={settings.voiceActivation} 
                  onToggle={() => toggleSetting('voiceActivation')} 
                />
              </div>
              
              {settings.voiceActivation && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-800">Từ khóa tùy chỉnh</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowKeywordForm(true)}
                    >
                      Thêm từ khóa
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {customKeywords.map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-800">"{keyword}"</span>
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
                  
                  {showKeywordForm && (
                    <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newKeyword}
                          onChange={(e) => setNewKeyword(e.target.value)}
                          placeholder="Nhập từ khóa mới..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Button onClick={addKeyword} disabled={!newKeyword.trim()}>
                          Thêm
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setShowKeywordForm(false)
                            setNewKeyword('')
                          }}
                        >
                          Hủy
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="mr-2 text-purple-600" size={20} />
              Quyền riêng tư & Vị trí
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Chia sẻ vị trí</h3>
                  <p className="text-sm text-gray-600">Gửi vị trí GPS trong tin nhắn khẩn cấp</p>
                </div>
                <ToggleSwitch 
                  enabled={settings.locationSharing} 
                  onToggle={() => toggleSetting('locationSharing')} 
                />
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="text-green-600 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-semibold text-green-800 mb-1">Cam kết quyền riêng tư</h3>
                    <p className="text-sm text-green-700">
                      Tất cả dữ liệu của bạn chỉ được lưu trữ cục bộ trên thiết bị này. 
                      Chúng tôi không thu thập, xem hay chia sẻ bất kỳ thông tin cá nhân nào.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Info className="mr-2 text-gray-600" size={20} />
              Thông tin ứng dụng
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Phiên bản</span>
                <span className="font-medium text-gray-800">1.0.0 (Beta)</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Cập nhật cuối</span>
                <span className="font-medium text-gray-800">18/07/2025</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Dung lượng ứng dụng</span>
                <span className="font-medium text-gray-800">~25 MB</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <Button variant="outline" className="w-full justify-between">
                Chính sách quyền riêng tư
                <ChevronRight size={16} />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Điều khoản sử dụng
                <ChevronRight size={16} />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Liên hệ hỗ trợ
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage

