import './App.css'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
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
  Volume2,
  Star,
  CheckCircle,
  ArrowRight,
  Download,
  Smartphone,
  Globe,
  Users,
  Zap,
  Eye,
  Clock,
  Award,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])

  const handleEarlyAccess = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      // In real app, send to backend
      console.log('Early access signup:', email)
    }
  }

  const features = [
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "100% Offline",
      description: "Hoạt động hoàn toàn không cần internet. Dữ liệu không bao giờ rời khỏi thiết bị của bạn."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Quyền Riêng Tư Tuyệt Đối",
      description: "Không thu thập, không lưu trữ, không chia sẻ bất kỳ thông tin cá nhân nào."
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Kích Hoạt Bằng Giọng Nói",
      description: "Chỉ cần nói 'Cứu tôi' để kích hoạt SOS ngay cả khi không thể chạm vào điện thoại."
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Ghi Bằng Chứng Tự Động",
      description: "Tự động ghi âm, quay video và chụp ảnh để lưu giữ bằng chứng quan trọng."
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Gọi Khẩn Cấp",
      description: "Tự động gọi cho 3 người thân đã cài đặt theo thứ tự ưu tiên."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "SMS Với Vị Trí",
      description: "Gửi tin nhắn khẩn cấp kèm vị trí GPS chính xác đến người thân."
    }
  ]

  const testimonials = [
    {
      name: "Nguyễn Thị Mai",
      role: "Nhân viên văn phòng",
      content: "Tôi cảm thấy an toàn hơn nhiều khi đi làm về muộn. Chỉ cần nói 'cứu tôi' là gia đình biết ngay.",
      rating: 5
    },
    {
      name: "Trần Văn Hùng",
      role: "Tài xế công nghệ",
      content: "Làm việc ban đêm rất cần thiết bị này. Offline hoàn toàn nên không lo bị hack hay theo dõi.",
      rating: 5
    },
    {
      name: "Lê Thị Hoa",
      role: "Sinh viên",
      content: "Bố mẹ yên tâm hơn khi con ở xa nhà. Ứng dụng đơn giản, dễ dùng, không phức tạp.",
      rating: 5
    }
  ]

  const stats = [
    { number: "100%", label: "Offline" },
    { number: "0%", label: "Thu thập dữ liệu" },
    { number: "3s", label: "Thời gian phản ứng" },
    { number: "24/7", label: "Bảo vệ liên tục" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MyProtector Shield
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Tính năng</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">Cách hoạt động</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Đánh giá</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Giá cả</a>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Đăng ký sớm
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t border-gray-200"
            >
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Tính năng</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">Cách hoạt động</a>
                <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Đánh giá</a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Giá cả</a>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full">
                  Đăng ký sớm
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap size={16} />
              <span>Ra mắt sớm - Đăng ký ngay để nhận ưu đãi</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Người Vệ Sĩ
              </span>
              <br />
              <span className="text-gray-800">Riêng Tư Của Bạn</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Ứng dụng an toàn cá nhân hoạt động <strong>100% offline</strong>, 
              bảo vệ quyền riêng tư tuyệt đối. Kích hoạt SOS bằng giọng nói, 
              ghi bằng chứng tự động.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto"
              >
                <Download className="mr-2" size={20} />
                Tải về miễn phí
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4 h-auto border-2"
              >
                <Globe className="mr-2" size={20} />
                Xem demo trực tuyến
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tại sao chọn <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MyProtector Shield</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Được thiết kế với 3 nguyên tắc cốt lõi: Offline First, Privacy First, Simple First
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-blue-600 group-hover:text-purple-600 transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Cách hoạt động
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Đơn giản, nhanh chóng và hiệu quả trong tình huống khẩn cấp
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Kích hoạt SOS</h3>
              <p className="text-gray-600">Nhấn nút SOS hoặc nói "Cứu tôi" để kích hoạt báo động khẩn cấp</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Gọi & Gửi tin</h3>
              <p className="text-gray-600">Tự động gọi người thân và gửi SMS kèm vị trí GPS chính xác</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Ghi bằng chứng</h3>
              <p className="text-gray-600">Tự động ghi âm, quay video và chụp ảnh để lưu giữ bằng chứng</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Người dùng nói gì về chúng tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hàng nghìn người đã tin tưởng MyProtector Shield để bảo vệ an toàn
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Giá cả đơn giản, minh bạch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Một mức phí duy nhất để duy trì và phát triển ứng dụng
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white rounded-3xl border-2 border-purple-200 p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">MyProtector Shield</h3>
                <div className="text-5xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    299.000đ
                  </span>
                </div>
                <p className="text-gray-600">một lần / trọn đời</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Sử dụng trọn đời</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Tất cả tính năng</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Cập nhật miễn phí</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Hỗ trợ 24/7</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Không quảng cáo</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-4 h-auto">
                Đăng ký ngay
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Early Access CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sẵn sàng bảo vệ bản thân?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Đăng ký sớm để nhận ưu đãi đặc biệt và là người đầu tiên trải nghiệm MyProtector Shield
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleEarlyAccess} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl text-gray-800 text-lg"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 h-auto text-lg font-semibold whitespace-nowrap"
                >
                  Đăng ký sớm
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto"
              >
                <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Cảm ơn bạn!</h3>
                <p className="text-blue-100">Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Shield className="text-white" size={24} />
                </div>
                <span className="text-xl font-bold">MyProtector Shield</span>
              </div>
              <p className="text-gray-400">
                Người vệ sĩ riêng tư của bạn. An toàn, riêng tư, đơn giản.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Sản phẩm</h4>
              <div className="space-y-2 text-gray-400">
                <div>Tính năng</div>
                <div>Giá cả</div>
                <div>Tải về</div>
                <div>Hỗ trợ</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Công ty</h4>
              <div className="space-y-2 text-gray-400">
                <div>Về chúng tôi</div>
                <div>Blog</div>
                <div>Liên hệ</div>
                <div>Tuyển dụng</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Pháp lý</h4>
              <div className="space-y-2 text-gray-400">
                <div>Chính sách quyền riêng tư</div>
                <div>Điều khoản sử dụng</div>
                <div>Bảo mật</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MyProtector Shield. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

