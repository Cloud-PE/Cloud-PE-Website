import React, { useState } from 'react'

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

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <img src="/img/loading.svg" alt="加载中..." className="w-8 h-8" />
        </div>
      )}
      {error ? (
        <div className="flex items-center justify-center bg-muted h-full min-h-[200px]">
          <img src="/img/loading.svg" alt="加载失败" className="w-8 h-8" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-auto rounded-lg transition-opacity duration-300 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  )
}

export default ImageWithLoading
