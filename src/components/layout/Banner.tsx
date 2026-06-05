import React from 'react'

interface BannerProps {
  title: string
  subtitle?: string
}

const Banner: React.FC<BannerProps> = ({ title, subtitle }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg md:text-xl text-center text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}

export default Banner
