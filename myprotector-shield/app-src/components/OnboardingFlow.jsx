import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { 
  Shield, 
  Users, 
  Phone, 
  TestTube, 
  Lock, 
  ChevronRight, 
  ChevronLeft,
  Check,
  AlertTriangle,
  Mic,
  Camera,
  MapPin
} from 'lucide-react'

const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [userAgreement, setUserAgreement] = useState({
    privacy: false,
    emergency: false,
    responsibility: false
  })

  const steps = [
    {
      id: 'welcome',
      title: 'Chào mừng đến với MyProtector Shield',
      subtitle: 'Người vệ sĩ riêng tư của bạn',
      icon: Shield,
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Shield className="text-blue-600" size={48} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Bảo vệ bạn trong mọi tình huống
            </h2>
            <p className="text-gray-600 leading-relaxed">
              MyProtector Shield là ứng dụng an toàn cá nhân hoạt động hoàn toàn offline, 
              giúp bạn kích hoạt cảnh báo khẩn cấp và ghi lại bằng chứng khi cần thiết.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="text-green-600" size={16} />
              </div>
              <p className="text-sm font-medium text-green-800">Offline First</p>
              <p className="text-xs text-green-600">Hoạt động không cần internet</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock className="text-blue-600" size={16} />
              </div>
              <p className="text-sm font-medium text-blue-800">Privacy First</p>
              <p className="text-xs text-blue-600">Không thu thập dữ liệu</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Phone className="text-purple-600" size={16} />
              </div>
              <p className="text-sm font-medium text-purple-800">Simple First</p>
              <p className="text-xs text-purple-600">Dễ dùng khi khẩn cấp</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'contacts',
      title: 'Thiết lập Liên hệ Khẩn cấp',
      subtitle: 'Thêm tối đa 3 người thân để nhận cảnh báo',
      icon: Users,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-red-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Ai sẽ nhận được cảnh báo?
            </h3>
            <p className="text-gray-600">
              Khi bạn kích hoạt SOS, ứng dụng sẽ tự động gọi và gửi SMS đến những người này theo thứ tự ưu tiên.
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="text-yellow-600 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">Quan trọng</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Chọn những người luôn sẵn sàng hỗ trợ bạn</li>
                  <li>• Thông báo cho họ về ứng dụng này trước</li>
                  <li>• Đảm bảo số điện thoại chính xác và hoạt động</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">1</span>
                </div>
                <span className="text-gray-700">Liên hệ ưu tiên cao nhất</span>
              </div>
              <span className="text-xs text-gray-500">Gọi đầu tiên</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-green-600">2</span>
                </div>
                <span className="text-gray-700">Liên hệ dự phòng</span>
              </div>
              <span className="text-xs text-gray-500">Nếu #1 không nghe máy</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-600">3</span>
                </div>
                <span className="text-gray-700">Liên hệ bổ sung</span>
              </div>
              <span className="text-xs text-gray-500">Hỗ trợ thêm</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'activation',
      title: 'Cách Kích hoạt SOS',
      subtitle: 'Học cách sử dụng trong tình huống khẩn cấp',
      icon: Phone,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-red-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              2 cách kích hoạt SOS
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">1. Nút SOS</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Nhấn nút SOS đỏ lớn trên màn hình chính
                  </p>
                  <div className="text-xs text-gray-500">
                    ⏱️ Có 3 giây để hủy nếu nhấn nhầm
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Mic className="text-purple-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">2. Giọng nói</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Bật "Chế độ Lắng nghe" và nói "Cứu tôi" hoặc "Help me"
                  </p>
                  <div className="text-xs text-gray-500">
                    🎤 Hữu ích khi không thể chạm màn hình
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">Khi SOS được kích hoạt:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>✅ Gọi liên hệ khẩn cấp theo thứ tự</li>
              <li>✅ Gửi SMS với vị trí GPS</li>
              <li>✅ Phát âm thanh cảnh báo</li>
              <li>✅ Ghi âm/video bằng chứng</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'testing',
      title: 'Chế độ Kiểm tra',
      subtitle: 'Thử nghiệm an toàn trước khi sử dụng thật',
      icon: TestTube,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TestTube className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Luôn kiểm tra trước khi cần
            </h3>
            <p className="text-gray-600">
              Chế độ kiểm tra giúp bạn thử tất cả tính năng mà không thực sự gửi cảnh báo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Camera className="text-blue-600" size={20} />
                <span className="font-medium text-gray-800">Kiểm tra Camera</span>
              </div>
              <p className="text-sm text-gray-600">Xác minh quyền truy cập camera</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Mic className="text-green-600" size={20} />
                <span className="font-medium text-gray-800">Kiểm tra Micro</span>
              </div>
              <p className="text-sm text-gray-600">Xác minh quyền truy cập micro</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <MapPin className="text-purple-600" size={20} />
                <span className="font-medium text-gray-800">Kiểm tra GPS</span>
              </div>
              <p className="text-sm text-gray-600">Lấy vị trí để gửi trong SMS</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Phone className="text-red-600" size={20} />
                <span className="font-medium text-gray-800">Kiểm tra Liên hệ</span>
              </div>
              <p className="text-sm text-gray-600">Xác minh danh sách liên hệ</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Khuyến nghị:</h4>
            <p className="text-sm text-blue-700">
              Chạy kiểm tra ít nhất 1 lần/tháng để đảm bảo ứng dụng luôn sẵn sàng khi bạn cần.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'privacy',
      title: 'Cam kết Quyền riêng tư',
      subtitle: 'Dữ liệu của bạn thuộc về bạn',
      icon: Lock,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              100% Riêng tư, 0% Thu thập dữ liệu
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <Check className="text-green-600 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium text-green-800">Lưu trữ cục bộ</h4>
                <p className="text-sm text-green-700">
                  Tất cả dữ liệu chỉ được lưu trên thiết bị của bạn
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <Check className="text-green-600 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium text-green-800">Không có máy chủ</h4>
                <p className="text-sm text-green-700">
                  Chúng tôi không có máy chủ để lưu trữ thông tin của bạn
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <Check className="text-green-600 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium text-green-800">Mã hóa bằng chứng</h4>
                <p className="text-sm text-green-700">
                  Bằng chứng được mã hóa và bảo vệ bằng PIN
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <Check className="text-green-600 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium text-green-800">Hoạt động offline</h4>
                <p className="text-sm text-green-700">
                  Không cần internet, không gửi dữ liệu đi đâu
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={userAgreement.privacy}
                onChange={(e) => setUserAgreement(prev => ({...prev, privacy: e.target.checked}))}
                className="mt-1"
              />
              <span className="text-sm text-gray-700">
                Tôi hiểu rằng dữ liệu của tôi chỉ được lưu trữ cục bộ và không bao giờ được chia sẻ
              </span>
            </label>
            
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={userAgreement.emergency}
                onChange={(e) => setUserAgreement(prev => ({...prev, emergency: e.target.checked}))}
                className="mt-1"
              />
              <span className="text-sm text-gray-700">
                Tôi hiểu cách sử dụng ứng dụng trong tình huống khẩn cấp
              </span>
            </label>
            
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={userAgreement.responsibility}
                onChange={(e) => setUserAgreement(prev => ({...prev, responsibility: e.target.checked}))}
                className="mt-1"
              />
              <span className="text-sm text-gray-700">
                Tôi sẽ thông báo cho người thân về ứng dụng này và chạy kiểm tra định kỳ
              </span>
            </label>
          </div>
        </div>
      )
    }
  ]

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const canProceed = isLastStep ? 
    Object.values(userAgreement).every(Boolean) : 
    true

  const nextStep = () => {
    if (isLastStep && canProceed) {
      onComplete()
    } else if (canProceed) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const Icon = currentStepData.icon

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon className="text-blue-600" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{currentStepData.title}</h1>
                <p className="text-sm text-gray-600">{currentStepData.subtitle}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {currentStep + 1} / {steps.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStepData.content}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft size={16} />
            <span>Quay lại</span>
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={!canProceed}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
          >
            <span>{isLastStep ? 'Hoàn tất' : 'Tiếp tục'}</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingFlow

