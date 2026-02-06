import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

const NotFound: React.FC = () => {
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    setCanGoBack(window.history.length > 1)
  }, [])

  return (
    <section className="flex-1 flex items-center justify-center py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          页面未找到
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          抱歉，您访问的页面不存在或已被移除
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button render={<Link to="/" />}>
            <Home className="w-4 h-4 mr-2" />
            返回首页
          </Button>
          {canGoBack && (
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回上一页
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export default NotFound
