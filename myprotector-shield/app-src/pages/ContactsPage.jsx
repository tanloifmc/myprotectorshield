import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { 
  Plus, 
  Phone, 
  Edit, 
  Trash2, 
  User, 
  Shield,
  AlertCircle
} from 'lucide-react'

const ContactsPage = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Mẹ', phone: '0987654321', relationship: 'Gia đình' },
    { id: 2, name: 'Anh Minh', phone: '0912345678', relationship: 'Bạn thân' },
  ])
  
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', phone: '', relationship: '' })

  const handleAdd = () => {
    setIsAdding(true)
    setFormData({ name: '', phone: '', relationship: '' })
  }

  const handleEdit = (contact) => {
    setEditingId(contact.id)
    setFormData({ name: contact.name, phone: contact.phone, relationship: contact.relationship })
  }

  const handleSave = () => {
    if (formData.name && formData.phone) {
      if (isAdding) {
        const newContact = {
          id: Date.now(),
          ...formData
        }
        setContacts([...contacts, newContact])
        setIsAdding(false)
      } else {
        setContacts(contacts.map(contact => 
          contact.id === editingId ? { ...contact, ...formData } : contact
        ))
        setEditingId(null)
      }
      setFormData({ name: '', phone: '', relationship: '' })
    }
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({ name: '', phone: '', relationship: '' })
  }

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa liên hệ này?')) {
      setContacts(contacts.filter(contact => contact.id !== id))
    }
  }

  const handleTestCall = (contact) => {
    alert(`📞 Đang thực hiện cuộc gọi thử nghiệm đến ${contact.name} (${contact.phone})`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:ml-64">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Shield className="text-red-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Liên hệ Khẩn cấp</h1>
              <p className="text-gray-600">Quản lý danh sách người thân được gọi khi SOS</p>
            </div>
          </div>
          
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="text-blue-600 mt-0.5" size={20} />
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Quan trọng</h3>
                <p className="text-sm text-blue-700">
                  Khi SOS được kích hoạt, ứng dụng sẽ tự động gọi lần lượt các số này và gửi SMS chứa vị trí của bạn. 
                  Hãy đảm bảo thông tin chính xác và thông báo cho họ về ứng dụng này.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Contact Button */}
        {!isAdding && !editingId && contacts.length < 3 && (
          <div className="mb-6">
            <Button 
              onClick={handleAdd}
              className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2" size={18} />
              Thêm liên hệ khẩn cấp
            </Button>
          </div>
        )}

        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {isAdding ? 'Thêm liên hệ mới' : 'Chỉnh sửa liên hệ'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên người liên hệ *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ví dụ: Mẹ, Anh Minh, Chị Lan..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0987654321"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mối quan hệ
                </label>
                <select
                  value={formData.relationship}
                  onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Chọn mối quan hệ</option>
                  <option value="Gia đình">Gia đình</option>
                  <option value="Bạn thân">Bạn thân</option>
                  <option value="Đồng nghiệp">Đồng nghiệp</option>
                  <option value="Hàng xóm">Hàng xóm</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button onClick={handleCancel} variant="outline" className="flex-1">
                Hủy
              </Button>
              <Button 
                onClick={handleSave} 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={!formData.name || !formData.phone}
              >
                {isAdding ? 'Thêm' : 'Lưu'}
              </Button>
            </div>
          </div>
        )}

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div key={contact.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        #{index + 1}
                      </span>
                    </div>
                    <p className="text-gray-600">{contact.phone}</p>
                    {contact.relationship && (
                      <p className="text-sm text-gray-500">{contact.relationship}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestCall(contact)}
                    className="text-green-600 border-green-300 hover:bg-green-50"
                  >
                    <Phone size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(contact)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(contact.id)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {contacts.length === 0 && !isAdding && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Chưa có liên hệ khẩn cấp
            </h3>
            <p className="text-gray-600 mb-6">
              Thêm ít nhất 1 liên hệ để có thể sử dụng tính năng SOS
            </p>
            <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2" size={18} />
              Thêm liên hệ đầu tiên
            </Button>
          </div>
        )}

        {/* Limit Notice */}
        {contacts.length >= 3 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="text-yellow-600" size={20} />
              <p className="text-sm text-yellow-800">
                Bạn đã thêm tối đa 3 liên hệ khẩn cấp. Để thêm liên hệ mới, hãy xóa một liên hệ hiện có.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactsPage

