import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ImageWithLoading } from '@/components/common'
import { Download, Users, Sparkles, Rocket, Shield } from 'lucide-react'

const Home: React.FC = () => {

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: '免费纯净',
      description: '完全免费｜无广告｜无劫持｜无后门｜清爽体验',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: '强大兼容',
      description: '丰富驱动支持｜超强兼容性｜插件扩展｜无限可能',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: '现代美学',
      description: '简洁界面设计｜符合当代审美｜视觉舒适',
    },
  ]

  const screenshots = [
    {
      url: 'https://pic1.imgdb.cn/item/6905c7333203f7be00bf5cee.png',
      description: '初始资源占用情况，2GB内存也能完美使用。',
    },
    {
      url: 'https://pic1.imgdb.cn/item/6905c7323203f7be00bf5ce8.png',
      description:
        'Cloud-插件市场搭配Cloud-小助手，完美支持获取、搜索、管理和加载CE-插件以及HotPE模块',
    },
    {
      url: 'https://pic1.imgdb.cn/item/6869065258cb8da5c8914722.png',
      description: '内置Chromium浏览器，支持绝大多数网站，占用低',
    },
    {
      url: 'https://pic1.imgdb.cn/item/6869062858cb8da5c89146e2.png',
      description: '支持全局暗黑',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* 主标题 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              一款 <span className="gradient-highlight">实用的维护PE</span>
            </h1>

            {/* 副标题 */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              免费、纯净、强大、美观的 Win11 PE，支持系统维护和网络娱乐，支持加载 CE-插件和 HotPE 模块
            </p>

            {/* CTA 按钮 */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                size="lg"
                render={<Link to="/download" />}
              >
                <Download className="w-5 h-5 mr-2" />
                立即下载
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link to="/qqg" />}
              >
                <Users className="w-5 h-5 mr-2" />
                加入社区
              </Button>
            </div>

            {/* 主图 */}
            <div className="w-full max-w-4xl">
              <Card className="relative flex flex-col gap-6 rounded-2xl bg-card bg-clip-padding py-6 text-card-foreground border border-border/50 shadow-xs shadow-primary/24 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-white/16%)] dark:bg-clip-border dark:before:shadow-[0_-1px_--theme(--color-white/8%)] overflow-hidden" style={{background: 'var(--main-photo-background)'}}>
                <ImageWithLoading
                  src="https://pic1.imgdb.cn/item/6921c92c3203f7be0021a48e.png"
                  alt="Cloud-PE 主图"
                  className="w-full"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 特性介绍 */}
      <section className="relative py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              为什么选择我们？
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              内置主流的无线网卡、有线网卡、触摸驱动、声卡驱动、磁盘驱动，拥有极高的兼容性
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-border/50"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted text-foreground mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 截图展示 */}
      <section className="relative py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              系统截图
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              下图演示的仅为 Cloud-PE 的部分功能（包括 CE-插件，自带工具等），由于截图不定时更新，请以实际为准
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-10">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="space-y-3">
                <div className="overflow-hidden rounded-lg border border-border/50">
                  <ImageWithLoading
                    src={screenshot.url}
                    alt={screenshot.description}
                    className="w-full"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center" style={{ marginTop: '18px' }}>
                  {screenshot.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-foreground font-semibold mt-12 text-lg">
            更多功能请自行探索
          </p>
        </div>
      </section>
    </>
  )
}

export default Home
