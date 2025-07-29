import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { 
  FileText, 
  Camera, 
  Mic, 
  Download, 
  Trash2, 
  Eye,
  Lock,
  Calendar,
  Clock,
  MapPin,
  Shield,
  AlertCircle
} from 'lucide-react'

const EvidencePage = () => {
  const [isLocked, setIsLocked] = useState(true)
  const [pin, setPin] = useState('')
  const [selectedEvidence, setSelectedEvidence] = useState(null)

  // Mock evidence data
  const evidenceData = [
    {
      id: 1,
      type: 'incident',
      date: '2024-01-15',
      time: '22:30',
      location: 'Quận 1, TP.HCM',
      duration: '5 phút 23 giây',
      files: [
        { type: 'audio', name: 'recording_001.mp3', size: '2.1 MB' },
        { type: 'video', name: 'camera_front_001.mp4', size: '15.3 MB' },
        { type: 'video', name: 'camera_back_001.mp4', size: '18.7 MB' },
        { type: 'image', name: 'location_001.jpg', size: '0.8 MB' }
      ]
    },
    {
      id: 2,
      type: 'test',
      date: '2024-01-10',
      time: '14:15',
      location: 'Quận 7, TP.HCM',
      duration: '1 phút 45 giây',
      files: [
        { type: 'audio', name: 'test_recording_002.mp3', size: '0.9 MB' },
        { type: 'image', name: 'test_location_002.jpg', size: '0.5 MB' }
      ]
    }
  ]

  const handleUnlock = () => {
    if (pin === '1234') { // Demo PIN
      setIsLocked(false)
      setPin('')
    } else {
      alert('Mã PIN không đúng')
      setPin('')
    }
  }

  const handleDeleteEvidence = (id) => {
    if (confirm('Bạn có chắc muốn xóa bằng chứng này? Hành động này không thể hoàn tác.')) {
      // In real app, delete the evidence
      alert('Bằng chứng đã được xóa')
    }
  }

  const handleExportEvidence = (evidence) => {
    alert(`Đang xuất bằng chứng từ ${evidence.date} ${evidence.time}...`)
  }

  const getFileIcon = (type) => {
    switch (type) {
      case 'audio':
        return <Mic className="text-blue-600" size={16} />
      case 'video':
        return <Camera className="text-green-600" size={16} />
      case 'image':
        return <Camera className="text-purple-600" size={16} />
      default:
        return <FileText className="text-gray-600" size={16} />
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'incident':
        return { label: 'Sự cố thực tế', color: 'bg-red-100 text-red-800' }
      case 'test':
        return { label: 'Kiểm tra', color: 'bg-blue-100 text-blue-800' }
      default:
        return { label: 'Khác', color: 'bg-gray-100 text-gray-800' }
    }
  }

  if (isLocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-4 lg:ml-64">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-red-600" size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Thư viện Bằng chứng</h2>
              <p className="text-gray-600">Nhập mã PIN để truy cập bằng chứng được bảo vệ</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã PIN bảo mật
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                  placeholder="••••"
                  maxLength={4}
                />
              </div>
              
              <Button 
                onClick={handleUnlock}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3"
                disabled={pin.length !== 4}
              >
                Mở khóa
              </Button>
              
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Demo PIN: 1234
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:ml-64">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="text-purple-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Thư viện Bằng chứng</h1>
                <p className="text-gray-600">Quản lý và xuất bằng chứng đã ghi lại</p>
              </div>
            </div>
            
            <Button
              onClick={() => setIsLocked(true)}
              variant="outline"
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Lock size={16} className="mr-2" />
              Khóa
            </Button>
          </div>
          
          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="text-green-600 mt-0.5" size={20} />
              <div>
                <h3 className="font-semibold text-green-800 mb-1">Bảo mật tuyệt đối</h3>
                <p className="text-sm text-green-700">
                  Tất cả bằng chứng được lưu trữ cục bộ trên thiết bị của bạn và được mã hóa. 
                  Chúng tôi không bao giờ truy cập hay sao lưu dữ liệu này lên máy chủ.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Evidence List */}
        {evidenceData.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Chưa có bằng chứng nào
            </h3>
            <p className="text-gray-600 mb-6">
              Bằng chứng sẽ được tự động ghi lại khi bạn kích hoạt SOS
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {evidenceData.map((evidence) => {
              const typeInfo = getTypeLabel(evidence.type)
              
              return (
                <div key={evidence.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="text-gray-600" size={20} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-800">
                            Bằng chứng #{evidence.id}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                            {typeInfo.label}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar size={14} />
                            <span>{evidence.date}</span>
                            <Clock size={14} />
                            <span>{evidence.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin size={14} />
                            <span>{evidence.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock size={14} />
                            <span>Thời lượng: {evidence.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExportEvidence(evidence)}
                        className="text-blue-600 border-blue-300 hover:bg-blue-50"
                      >
                        <Download size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedEvidence(evidence)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteEvidence(evidence.id)}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Files List */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Tệp tin đính kèm ({evidence.files.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {evidence.files.map((file, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          {getFileIcon(file.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Storage Info */}
        <div className="mt-8 bg-gray-100 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">📊 Thông tin lưu trữ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Tổng bằng chứng:</span>
              <span className="font-medium text-gray-800 ml-2">{evidenceData.length}</span>
            </div>
            <div>
              <span className="text-gray-600">Dung lượng sử dụng:</span>
              <span className="font-medium text-gray-800 ml-2">~45 MB</span>
            </div>
            <div>
              <span className="text-gray-600">Dung lượng còn lại:</span>
              <span className="font-medium text-gray-800 ml-2">~2.1 GB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EvidencePage

