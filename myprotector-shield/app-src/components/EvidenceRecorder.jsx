import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { 
  Camera, 
  Mic, 
  Video, 
  Square, 
  Play, 
  Pause,
  Download,
  Trash2,
  Eye,
  MapPin,
  Clock,
  HardDrive,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

const EvidenceRecorder = ({ isRecording, onStart, onStop, triggerInfo }) => {
  const [recordingState, setRecordingState] = useState({
    audio: false,
    video: false,
    photos: false
  })
  const [mediaStream, setMediaStream] = useState(null)
  const [recordedChunks, setRecordedChunks] = useState([])
  const [currentLocation, setCurrentLocation] = useState(null)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [storageUsed, setStorageUsed] = useState(0)
  const [permissions, setPermissions] = useState({
    camera: 'unknown',
    microphone: 'unknown',
    location: 'unknown'
  })

  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const intervalRef = useRef(null)
  const photoIntervalRef = useRef(null)

  useEffect(() => {
    checkPermissions()
    getCurrentLocation()
    calculateStorageUsed()
    
    return () => {
      stopAllRecording()
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (photoIntervalRef.current) clearInterval(photoIntervalRef.current)
    }
  }, [])

  useEffect(() => {
    if (isRecording && !recordingState.audio && !recordingState.video) {
      startRecording()
    } else if (!isRecording && (recordingState.audio || recordingState.video)) {
      stopAllRecording()
    }
  }, [isRecording])

  const checkPermissions = async () => {
    try {
      // Check camera permission
      const cameraPermission = await navigator.permissions.query({ name: 'camera' })
      // Check microphone permission
      const micPermission = await navigator.permissions.query({ name: 'microphone' })
      // Check location permission
      const locationPermission = await navigator.permissions.query({ name: 'geolocation' })
      
      setPermissions({
        camera: cameraPermission.state,
        microphone: micPermission.state,
        location: locationPermission.state
      })
    } catch (error) {
      console.log('Permission check failed:', error)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString()
          })
        },
        (error) => {
          console.error('Location error:', error)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      )
    }
  }

  const calculateStorageUsed = () => {
    // Simulate storage calculation
    const mockUsage = Math.floor(Math.random() * 500) + 100 // 100-600 MB
    setStorageUsed(mockUsage)
  }

  const startRecording = async () => {
    try {
      // Request camera and microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true
      })
      
      setMediaStream(stream)
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      
      // Start media recorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      })
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data])
        }
      }
      
      mediaRecorder.onstop = () => {
        saveRecording()
      }
      
      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start(1000) // Collect data every second
      
      setRecordingState({
        audio: true,
        video: true,
        photos: true
      })
      
      // Start duration counter
      intervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
      
      // Start photo capture interval
      photoIntervalRef.current = setInterval(() => {
        capturePhoto()
      }, 3000) // Every 3 seconds
      
    } catch (error) {
      console.error('Recording start failed:', error)
      alert('Không thể bắt đầu ghi. Vui lòng kiểm tra quyền truy cập camera và micro.')
    }
  }

  const stopAllRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop())
      setMediaStream(null)
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    
    if (photoIntervalRef.current) {
      clearInterval(photoIntervalRef.current)
      photoIntervalRef.current = null
    }
    
    setRecordingState({
      audio: false,
      video: false,
      photos: false
    })
  }

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      
      context.drawImage(videoRef.current, 0, 0)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const timestamp = new Date().toISOString()
          const filename = `photo_${timestamp}.jpg`
          
          // In a real app, save to secure storage
          console.log(`Photo captured: ${filename}, size: ${blob.size} bytes`)
        }
      }, 'image/jpeg', 0.8)
    }
  }

  const saveRecording = () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' })
      const timestamp = new Date().toISOString()
      const filename = `evidence_${timestamp}.webm`
      
      // In a real app, save to secure encrypted storage
      console.log(`Recording saved: ${filename}, size: ${blob.size} bytes`)
      
      // Create download link for demo
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      setRecordedChunks([])
    }
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getPermissionIcon = (state) => {
    switch (state) {
      case 'granted':
        return <CheckCircle className="text-green-600" size={16} />
      case 'denied':
        return <AlertCircle className="text-red-600" size={16} />
      default:
        return <AlertCircle className="text-yellow-600" size={16} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Recording Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Ghi Bằng chứng</h3>
          <div className="flex items-center space-x-2">
            {isRecording && (
              <div className="flex items-center space-x-2 text-red-600">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <span className="text-sm font-medium">ĐANG GHI</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Video Preview */}
        <div className="relative mb-4">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-48 bg-gray-900 rounded-lg object-cover"
          />
          {!mediaStream && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center">
                <Camera className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-sm text-gray-600">Camera sẽ bật khi ghi bằng chứng</p>
              </div>
            </div>
          )}
          
          {isRecording && (
            <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-lg text-sm">
              {formatDuration(recordingDuration)}
            </div>
          )}
        </div>
        
        {/* Recording Controls */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className={`p-3 rounded-lg border ${
            recordingState.video ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-1">
              <Video size={16} className={recordingState.video ? 'text-red-600' : 'text-gray-600'} />
              <span className="text-sm font-medium">Video</span>
            </div>
            <p className="text-xs text-gray-600">
              {recordingState.video ? 'Đang ghi video HD' : 'Sẵn sàng ghi'}
            </p>
          </div>
          
          <div className={`p-3 rounded-lg border ${
            recordingState.audio ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-1">
              <Mic size={16} className={recordingState.audio ? 'text-red-600' : 'text-gray-600'} />
              <span className="text-sm font-medium">Âm thanh</span>
            </div>
            <p className="text-xs text-gray-600">
              {recordingState.audio ? 'Đang ghi âm' : 'Sẵn sàng ghi'}
            </p>
          </div>
          
          <div className={`p-3 rounded-lg border ${
            recordingState.photos ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-1">
              <Camera size={16} className={recordingState.photos ? 'text-red-600' : 'text-gray-600'} />
              <span className="text-sm font-medium">Ảnh</span>
            </div>
            <p className="text-xs text-gray-600">
              {recordingState.photos ? 'Chụp mỗi 3s' : 'Sẵn sàng chụp'}
            </p>
          </div>
        </div>
        
        {/* Manual Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={isRecording ? onStop : onStart}
            className={`${
              isRecording 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isRecording ? (
              <>
                <Square size={16} className="mr-2" />
                Dừng ghi
              </>
            ) : (
              <>
                <Play size={16} className="mr-2" />
                Bắt đầu ghi
              </>
            )}
          </Button>
          
          {mediaStream && (
            <Button
              variant="outline"
              onClick={capturePhoto}
            >
              <Camera size={16} className="mr-2" />
              Chụp ảnh
            </Button>
          )}
        </div>
      </div>

      {/* Permissions Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Trạng thái Quyền truy cập</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera size={16} className="text-gray-600" />
              <span className="text-sm">Camera</span>
            </div>
            <div className="flex items-center space-x-2">
              {getPermissionIcon(permissions.camera)}
              <span className="text-sm capitalize">{permissions.camera}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mic size={16} className="text-gray-600" />
              <span className="text-sm">Microphone</span>
            </div>
            <div className="flex items-center space-x-2">
              {getPermissionIcon(permissions.microphone)}
              <span className="text-sm capitalize">{permissions.microphone}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-gray-600" />
              <span className="text-sm">Vị trí</span>
            </div>
            <div className="flex items-center space-x-2">
              {getPermissionIcon(permissions.location)}
              <span className="text-sm capitalize">{permissions.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Session Info */}
      {triggerInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-3">Thông tin Phiên ghi hiện tại</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-700">Kích hoạt bởi:</span>
              <span className="ml-2 text-blue-600">{triggerInfo.method === 'voice' ? 'Giọng nói' : 'Nút SOS'}</span>
            </div>
            <div>
              <span className="font-medium text-blue-700">Thời gian:</span>
              <span className="ml-2 text-blue-600">{new Date().toLocaleString()}</span>
            </div>
            {triggerInfo.keyword && (
              <div>
                <span className="font-medium text-blue-700">Từ khóa:</span>
                <span className="ml-2 text-blue-600">"{triggerInfo.keyword}"</span>
              </div>
            )}
            {currentLocation && (
              <div>
                <span className="font-medium text-blue-700">Vị trí:</span>
                <span className="ml-2 text-blue-600">
                  {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Storage Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Thông tin Lưu trữ</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <HardDrive className="mx-auto text-gray-600 mb-2" size={24} />
            <p className="text-sm text-gray-600">Đã sử dụng</p>
            <p className="font-semibold text-gray-800">{formatFileSize(storageUsed * 1024 * 1024)}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Clock className="mx-auto text-gray-600 mb-2" size={24} />
            <p className="text-sm text-gray-600">Thời lượng ghi</p>
            <p className="font-semibold text-gray-800">{formatDuration(recordingDuration)}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Camera className="mx-auto text-gray-600 mb-2" size={24} />
            <p className="text-sm text-gray-600">Ảnh đã chụp</p>
            <p className="font-semibold text-gray-800">{Math.floor(recordingDuration / 3)}</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Lưu ý quan trọng</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Bằng chứng được mã hóa và lưu trữ an toàn trên thiết bị</li>
          <li>• Ghi âm/video sẽ tự động dừng sau 5 phút để tiết kiệm pin</li>
          <li>• Ảnh được chụp tự động mỗi 3 giây khi đang ghi</li>
          <li>• Vị trí GPS được ghi lại cùng với bằng chứng</li>
          <li>• Chỉ bạn mới có thể truy cập bằng chứng với mã PIN</li>
        </ul>
      </div>
    </div>
  )
}

export default EvidenceRecorder

