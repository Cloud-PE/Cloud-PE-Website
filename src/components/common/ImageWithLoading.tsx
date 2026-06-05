import React, { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface ImageWithLoadingProps {
  src: string
  alt: string
  className?: string
}

const ImageWithLoading: React.FC<ImageWithLoadingProps> = ({
  src,
  alt,
  className = '',
}) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setLoading(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  if (error) {
    return (
      <div
        className={`flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg bg-muted text-muted-foreground ${className}`}
      >
        <ImageOff className="h-8 w-8" />
        <span className="text-sm">图片加载失败</span>
      </div>
    )
  }

  return (
    <div className={`relative ${loading ? 'min-h-[200px]' : ''} ${className}`}>
      {loading && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto rounded-lg transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}

export default ImageWithLoading
