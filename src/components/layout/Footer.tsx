import React from 'react'
import { Separator } from '@/components/ui/separator'

const Footer: React.FC = () => {
  const relatedLinks = [
    { name: 'Cloud-PE 官网', url: 'https://cloud-pe.cn' },
    { name: 'Cloud-PE 文件下载站', url: 'https://files.cloud-pe.cn' },
    { name: 'Cloud-PE Docs', url: 'https://docs.cloud-pe.cn' },
    { name: 'LetRecovery', url: 'https://sysre.cn' },
    { name: 'LetWin', url: 'https://win.cloud-pe.cn' },
    { name: 'SysRE 云盘', url: 'https://pan.sysre.cn' },
    { name: 'Cloud-PE 服务监控页', url: 'https://status.cloud-pe.cn' },

  ]

  const otherLinks = [
    { name: 'dddffggの博客', url: 'https://blog.cloud-pe.cn' },
    { name: 'MS-CHS', url: 'https://ms-chs.github.io' },
    { name: 'JBT-RAMOS', url: 'https://jbt-ramos.github.io' },
  ]

  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="container mx-auto px-4 py-12">
        {/* Friend Links */}
        <div className="max-w-4xl mx-auto mb-10">
          <h3 className="font-bold text-center text-foreground mb-6 text-lg tracking-widest">
            友 情 链 接
          </h3>

          <div className="space-y-4">
            {/* 相关网站 */}
            <div className="text-center">
              <span className="text-sm text-muted-foreground mr-3">相关网站</span>
              <div className="inline-flex flex-wrap justify-center gap-x-1 gap-y-2">
                {relatedLinks.map((link, index) => (
                  <React.Fragment key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground/80 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                    {index < relatedLinks.length - 1 && (
                      <span className="text-border mx-1">丨</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 其他网站 */}
            <div className="text-center">
              <span className="text-sm text-muted-foreground mr-3">其他网站</span>
              <div className="inline-flex flex-wrap justify-center gap-x-1 gap-y-2">
                {otherLinks.map((link, index) => (
                  <React.Fragment key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground/80 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                    {index < otherLinks.length - 1 && (
                      <span className="text-border mx-1">丨</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="max-w-2xl mx-auto mb-8" />

        {/* Copyright Section */}
        <div className="text-center space-y-3">
          <p>
            <a
              href="https://beian.miit.gov.cn/#/Integrated/index"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              鲁ICP备2023028944号-3
            </a>
          </p>
          <p className="text-sm text-muted-foreground" style={{ fontSize: '14px' }}>
            © {new Date().getFullYear()} Cloud-PE Dev.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
