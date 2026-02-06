import React from 'react'
import { Banner } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download as DownloadIcon, Package, Puzzle, Info, FileText } from 'lucide-react'

const DownloadPage: React.FC = () => {

  const downloadItems = [
    {
      title: 'Cloud-PE 客户端',
      description: '推荐使用客户端制作启动盘，简单方便',
      icon: <Package className="w-6 h-6" />,
      url: 'https://p0.cloud-pe.cn/Cloud-PE%E6%96%87%E4%BB%B6/Cloud-PE%20One/Cloud-PE%20One.zip',
      primary: true,
    },
    {
      title: 'Cloud-PE ISO',
      description: '纯净 ISO 文件，适合高级用户',
      icon: <DownloadIcon className="w-6 h-6" />,
      url: 'https://p0.cloud-pe.cn/Cloud-PE%E6%96%87%E4%BB%B6/ISO%E6%96%87%E4%BB%B6/Cloud-PE.iso',
      primary: false,
    },
    {
      title: 'CE-插件',
      description: '扩展功能插件，按需下载',
      icon: <Puzzle className="w-6 h-6" />,
      url: 'https://files.cloud-pe.cn/%E4%B8%8B%E8%BD%BD/CE-%E6%8F%92%E4%BB%B6',
      version: null,
      primary: false,
    },
  ]

  return (
    <>
      <Banner title="下载" subtitle="获取最新版本的 Cloud-PE" />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* 提示信息 */}
          <div className="space-y-4 mb-12">
            <div className="flex items-center gap-2 rounded-xl border px-3.5 py-3 text-sm text-muted-foreground">
              <Info className="w-4 h-4 shrink-0" />
              <span>在此处下载的 Cloud-PE 将不包含插件，<strong className="text-foreground">下载插件</strong> 请到 <a href="https://files.cloud-pe.cn" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">下载站</a> 进行下载，官方搭建更安全</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-warning/32 bg-warning/4 px-3.5 py-3 text-sm text-muted-foreground">
              <FileText className="w-4 h-4 shrink-0 text-warning" />
              <span>我们强烈建议您阅读 <a href="https://docs.cloud-pe.cn" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">文档</a> 后再使用，这里有 Cloud-PE 一些问题的解决方案</span>
            </div>
          </div>

          {/* 下载卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {downloadItems.map((item) => (
              <Card
                key={item.title}
                className={`relative overflow-hidden ${
                  item.primary ? 'border-primary/50 bg-primary/5' : 'border-border/50'
                }`}
              >
                {item.primary && (
                  <Badge className="px-[calc(--spacing(2)-1px)] absolute top-0 right-0 rounded-none rounded-bl-lg border border-primary">推荐</Badge>
                )}
                <CardHeader className="text-center pb-2">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-4 ${
                    item.primary ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                  }`}>
                    {item.icon}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <Button
                    className="w-full"
                    variant={item.primary ? 'default' : 'outline'}
                    render={
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    下载
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 用户协议 */}
          <p className="text-center text-sm text-muted-foreground">
            使用 Cloud-PE 及其相关功能即表示您已经阅读并同意
            <a
              href="https://docs.cloud-pe.cn/overview/contract.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline mx-1"
            >
              Cloud-PE 用户协议
            </a>
          </p>
        </div>
      </section>
    </>
  )
}

export default DownloadPage
