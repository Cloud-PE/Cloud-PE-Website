import React from 'react'
import { Banner } from '@/components/layout'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogPanel,
} from '@/components/ui/dialog'
import { Users, QrCode, ExternalLink, MessageCircle } from 'lucide-react'

const QQGroup: React.FC = () => {
  const groups = [
    {
      name: 'Cloud-PE交流群',
      number: '1058066962',
      capacity: '500人',
      status: '可用',
      qrcode: '/img/qrcode_1058066962.jpg',
      joinUrl: 'https://qm.qq.com/q/EIRf5pLfW',
    },
  ]

  return (
    <>
      <Banner title="加入QQ群" subtitle="与我们一起交流，获取最新资讯" />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              请选择一个合适的QQ群加入
            </h2>
            <p className="text-muted-foreground">
              加入我们的社区，与其他用户交流使用心得
            </p>
          </div>

          <div className="space-y-6">
            {groups.map((group) => (
              <Card
                key={group.number}
                className="overflow-hidden border-border/50 !p-0 !gap-0"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* 左侧图标区 */}
                    <div className="flex items-center justify-center p-8 bg-gradient-to-br from-primary/10 to-accent/10 md:w-48">
                      <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center">
                        <Users className="w-10 h-10 text-primary" />
                      </div>
                    </div>

                    {/* 右侧内容区 */}
                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-1">
                            {group.name}
                          </h3>
                          <p className="text-muted-foreground font-mono">
                            {group.number}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="secondary">{group.capacity}</Badge>
                          <Badge variant="success">{group.status}</Badge>
                        </div>
                      </div>

                      <div className="flex gap-3 flex-wrap">
                        <Dialog>
                          <DialogTrigger
                            render={<Button variant="outline" />}
                          >
                            <QrCode className="w-4 h-4 mr-2" />
                            查看二维码
                          </DialogTrigger>
                          <DialogPopup>
                            <DialogHeader>
                              <DialogTitle><br></br></DialogTitle>
                            </DialogHeader>
                            <DialogPanel>
                              <div className="flex flex-col items-center">
                                <img
                                  src={group.qrcode}
                                  alt={`${group.name} 二维码`}
                                  className="max-w-full max-h-128 rounded-lg"
                                />
                              </div>
                            </DialogPanel>
                          </DialogPopup>
                        </Dialog>
                        <Button
                          render={
                            <a
                              href={group.joinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          }
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          点击加入
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default QQGroup
