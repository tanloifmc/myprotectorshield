import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { 
  Home, 
  Settings, 
  Shield, 
  FileText, 
  TestTube,
  Menu,
  X
} from 'lucide-react'

const Navigation = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'contacts', label: 'Liên hệ khẩn cấp', icon: Shield },
    { id: 'evidence', label: 'Bằng chứng', icon: FileText },
    { id: 'test', label: 'Kiểm tra', icon: TestTube },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ]

  const handlePageChange = (pageId) => {
    onPageChange(pageId)
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="text-blue-600" size={24} />
          <span className="font-bold text-lg text-gray-800">MyProtector Shield</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-white w-64 h-full shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Shield className="text-blue-600" size={24} />
                <span className="font-bold text-lg text-gray-800">MyProtector Shield</span>
              </div>
            </div>
            <nav className="p-4">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className={`w-full justify-start mb-2 ${
                      currentPage === item.id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handlePageChange(item.id)}
                  >
                    <Icon size={18} className="mr-3" />
                    {item.label}
                  </Button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-800">MyProtector</h1>
              <p className="text-sm text-gray-600">Shield</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                className={`w-full justify-start mb-2 ${
                  currentPage === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handlePageChange(item.id)}
              >
                <Icon size={18} className="mr-3" />
                {item.label}
              </Button>
            )
          })}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">100% Riêng tư</span>
            </div>
            <p className="text-xs text-green-700">
              Dữ liệu của bạn chỉ được lưu trên thiết bị này
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1">
        <div className="flex justify-around">
          {menuItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`flex-1 flex flex-col items-center py-2 ${
                  currentPage === item.id 
                    ? 'text-blue-600' 
                    : 'text-gray-600'
                }`}
                onClick={() => handlePageChange(item.id)}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{item.label.split(' ')[0]}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Navigation

