import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Layout } from '@/components/layout'
import { Home, Download, QQGroup, NotFound } from '@/pages'
import { useEffect } from 'react'

const pageTitles: Record<string, string> = {
  '/': '主页 - Cloud-PE',
  '/download': '下载 - Cloud-PE',
  '/qqg': '加入QQ群 - Cloud-PE',
}

const TitleUpdater: React.FC = () => {
  const location = useLocation()

  useEffect(() => {
    const title = pageTitles[location.pathname] || '主页 - Cloud-PE'
    document.title = title
  }, [location.pathname])

  return null
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <TitleUpdater />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/download" element={<Download />} />
            <Route path="/qqg" element={<QQGroup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
