import { useLocation } from 'react-router-dom'
import { CornerMarks } from './Frame'
import { useT } from '@/lib/i18n'

const friendLinks = [
  { name: 'Cloud-PE 文件下载站', url: 'https://files.cloud-pe.cn' },
  { name: 'LetRecovery', url: 'https://sysre.cn' },
  { name: 'UUP dump', url: 'https://uupdump.cloud-pe.cn' },
  { name: 'SysRE 云盘', url: 'https://pan.sysre.cn' },
  { name: 'Cloud-PE 服务监控页', url: 'https://status.cloud-pe.cn' },
  { name: 'dddffggの博客', url: 'https://blog.cloud-pe.cn' },
  { name: 'MS-CHS', url: 'https://ms-chs.github.io' },
  { name: 'JBT-RAMOS', url: 'https://jbt-ramos.github.io' },
]

const Footer: React.FC = () => {
  const t = useT()
  const { pathname } = useLocation()
  // 文档页不显示页脚
  if (pathname.startsWith('/docs')) return null
  return (
    <footer className="relative mt-8 py-8 text-muted-foreground before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-border/64">
      <CornerMarks />
      <div className="container flex w-full flex-col items-center gap-4 text-center text-sm">
        {/* 友情链接 */}
        <div className="flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span className="text-muted-foreground/70">{t.footer.friends}</span>
          {friendLinks.map((link, index) => (
            <span key={link.name} className="inline-flex items-center gap-2">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.name}
              </a>
              {index < friendLinks.length - 1 && (
                <span className="text-border" aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>

        {/* 备案号 + 版权 */}
        <div className="flex flex-col items-center gap-1.5">
          <a
            href="https://beian.miit.gov.cn/#/Integrated/index"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            鲁ICP备2023028944号-3
          </a>
          <p>
            © {new Date().getFullYear()} Cloud-PE · {t.footer.crafted}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
