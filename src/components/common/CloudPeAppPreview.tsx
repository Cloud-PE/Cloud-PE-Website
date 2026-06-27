import { useState, useRef, useLayoutEffect, type ReactNode } from 'react'
import { Minus, X, Search, Home, FileDown, Puzzle, FileText, Settings, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useVersionInfo } from '@/hooks/useVersionInfo'
import { cn } from '@/lib/utils'
import '@/styles/cloud-pe-emoji.css'

const NICKNAME = 'dddffgg'

// 真实 Cloud-PE One 使用的系统字体栈（移植自其 index.css），不沿用官网的 Cal Sans
const APP_FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'

interface NavItem {
  key: string
  text: string
  icon: ReactNode
  items?: { key: string; text: string }[]
}

// 与真实 Layout.tsx 一致的菜单结构
const NAV: NavItem[] = [
  { key: 'home', text: '首页', icon: <Home className="h-4 w-4" /> },
  {
    key: 'install',
    text: '安装',
    icon: <FileDown className="h-4 w-4" />,
    items: [
      { key: 'create-boot-drive', text: '制作启动盘' },
      { key: 'create-iso', text: '生成ISO镜像' },
    ],
  },
  {
    key: 'plugins',
    text: '插件',
    icon: <Puzzle className="h-4 w-4" />,
    items: [
      { key: 'download-plugins', text: '下载插件' },
      { key: 'manage-plugins', text: '插件管理' },
      { key: 'task-queue', text: '任务队列' },
    ],
  },
  { key: 'docs', text: '文档', icon: <FileText className="h-4 w-4" /> },
  { key: 'settings', text: '设置', icon: <Settings className="h-4 w-4" /> },
]

// 时段问候语（移植自真实 HomePage.tsx）
interface GreetingConfig {
  start: string
  end: string
  emoji: string
  text: string
}
const GREETINGS: GreetingConfig[] = [
  { start: '00:00', end: '00:59', emoji: '🌙', text: '夜猫子{n}，是在偷偷卷吗？' },
  { start: '01:00', end: '04:59', emoji: '🦉', text: '{n}，熬夜伤身，早点休息吧~' },
  { start: '05:00', end: '05:59', emoji: '🐦', text: '早起的{n}，今天一定会很好的！' },
  { start: '06:00', end: '06:59', emoji: '🌞', text: '{n}早上好，新的一天就此开始吧！' },
  { start: '07:00', end: '07:59', emoji: '☕', text: '早安{n}，来杯咖啡开启美好的一天吧' },
  { start: '08:00', end: '08:59', emoji: '💪', text: '{n}，元气满满的早晨，加油！' },
  { start: '09:00', end: '09:59', emoji: '🚀', text: '嗨{n}，美好的上午时光开始啦！' },
  { start: '10:00', end: '11:59', emoji: '👋', text: '上午好呀，{n}！' },
  { start: '12:00', end: '12:59', emoji: '🍜', text: '午饭时间到！{n}记得好好吃饭哦' },
  { start: '13:00', end: '13:59', emoji: '😴', text: '{n}，午后小憩一下，下午更有精神' },
  { start: '14:00', end: '14:59', emoji: '🌤️', text: '下午好{n}！' },
  { start: '15:00', end: '17:59', emoji: '☕', text: '嘿{n}，下午茶时间，放松一下吧' },
  { start: '18:00', end: '21:59', emoji: '🌆', text: '晚上好{n}，忙碌了一天，该放松啦' },
  { start: '22:00', end: '22:59', emoji: '🌙', text: '{n}，夜色渐深，准备休息了吗？' },
  { start: '23:00', end: '23:59', emoji: '🌆', text: '夜深了，早点休息吧{n}' },
]

function getGreeting(): { emoji: string; text: string } {
  const now = new Date()
  const cur = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  for (const g of GREETINGS) {
    if (cur >= g.start && cur <= g.end) return { emoji: g.emoji, text: g.text.replace('{n}', NICKNAME) }
  }
  return { emoji: '✨', text: `哈喽，${NICKNAME}！` }
}

/**
 * 官网首页嵌入的 Cloud-PE One 界面预览（原生 coss ui 实现，非 iframe）。
 * 样式严格对照真实 Cloud-PE One 的 Layout.tsx / HomePage.tsx 复刻：
 * h-12 标题栏、w-52 侧栏、text-2xl 问候语、80px Fluent 😎、绿色版本徽章。
 * 明暗随官网；搜索框可输入但回车无动作；左侧菜单可 hover、点击无反应。
 */
const AppWindow: React.FC = () => {
  const { peVersion } = useVersionInfo()
  const version = (peVersion || '1.4').replace(/^v/i, '')
  const [keyword, setKeyword] = useState('')
  const [expanded, setExpanded] = useState<string[]>(['install', 'plugins'])
  const [collapsed, setCollapsed] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const greeting = getGreeting()

  const toggleMenu = (key: string) =>
    setExpanded((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  return (
    <div
      className="flex h-full w-full select-none flex-col overflow-hidden bg-background text-foreground"
      style={{ fontFamily: APP_FONT }}
    >
      {/* 标题栏 —— 对照 Layout.tsx header（去掉拖动光标） */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-card px-4">
        <div className="flex shrink-0 items-center">
          <img src="/cloud-pe-one-logo.svg" className="mr-2 h-[30px] w-[30px]" alt="Logo" />
          <span className="text-xl font-semibold">Cloud-PE</span>
        </div>

        <div className="relative mx-4 hidden w-full max-w-md md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            placeholder="输入关键字，回车搜索插件"
            className="pl-9"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button variant="ghost" size="icon" tabIndex={-1} aria-hidden className="h-8 w-8">
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            tabIndex={-1}
            aria-hidden
            className="h-8 w-8 hover:bg-destructive hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* 侧栏 —— 完整移植 Layout.tsx（含折叠/图标条/hover 弹出） */}
        <aside
          className={cn(
            'flex shrink-0 flex-col border-r border-border bg-card transition-[width] duration-200',
            collapsed ? 'w-14' : 'w-52',
          )}
        >
          <nav className="flex-1 overflow-visible px-2 py-2">
            {NAV.map((item) => (
              <div key={item.key} className="mb-1">
                {item.items ? (
                  <div
                    className="relative"
                    onMouseEnter={() => collapsed && setHovered(item.key)}
                    onMouseLeave={() => collapsed && setHovered(null)}
                  >
                    <button
                      type="button"
                      onClick={() => !collapsed && toggleMenu(item.key)}
                      className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!collapsed && (
                        <>
                          <span className="ml-3 flex-1 text-left">{item.text}</span>
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform',
                              expanded.includes(item.key) && 'rotate-180',
                            )}
                          />
                        </>
                      )}
                    </button>

                    {/* 展开态子菜单 */}
                    <div
                      className={cn(
                        'ml-5 overflow-hidden transition-all duration-200',
                        !collapsed && expanded.includes(item.key)
                          ? 'mt-1 max-h-[500px] opacity-100'
                          : 'mt-0 max-h-0 opacity-0',
                      )}
                    >
                      <div className="space-y-1">
                        {item.items.map((sub) => (
                          <button
                            key={sub.key}
                            type="button"
                            tabIndex={-1}
                            className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent"
                          >
                            {sub.text}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 折叠态 hover 弹出子菜单 */}
                    {collapsed && hovered === item.key && (
                      <div
                        className="absolute left-full top-0 z-50 flex items-start pl-3"
                        onMouseEnter={() => setHovered(item.key)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <div className="min-w-[120px] rounded-lg border border-border bg-popover px-2 py-2 shadow-lg">
                          <div className="mb-1 px-2 py-1 text-xs text-muted-foreground">{item.text}</div>
                          <div className="space-y-1">
                            {item.items.map((sub) => (
                              <button
                                key={sub.key}
                                type="button"
                                tabIndex={-1}
                                className="w-full whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent"
                              >
                                {sub.text}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    tabIndex={-1}
                    className={cn(
                      'flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent',
                      item.key === 'home'
                        ? 'bg-accent font-medium text-accent-foreground'
                        : 'text-foreground',
                    )}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!collapsed && <span className="ml-3">{item.text}</span>}
                  </button>
                )}
              </div>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="flex items-center justify-center border-t border-border p-3 text-muted-foreground transition-colors hover:bg-accent"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </aside>

        {/* 首页内容 —— 问候语固定左上，主内容垂直居中以减少上下空白 */}
        <main className="relative flex-1 overflow-hidden bg-background">
          <div className="absolute left-[25px] top-[26px] w-auto whitespace-nowrap">
            <h2 className="flex items-center text-2xl font-bold">
              <span className="mr-1" aria-hidden>{greeting.emoji}</span>
              {greeting.text}
            </h2>
          </div>

          <div className="flex h-full flex-col items-center justify-center pb-2">
            <div className="cool mb-4 text-[80px]" aria-hidden />
            <p className="mb-3 text-lg font-semibold">已插入 Cloud-PE 启动盘</p>
            <div className="mb-6">
              <Badge
                variant="secondary"
                size="lg"
                className="h-auto! rounded-md px-3! py-1 text-sm! bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              >
                版本：Cloud-PE v{version}
              </Badge>
            </div>
            <Button tabIndex={-1}>下载插件</Button>
          </div>
        </main>
      </div>
    </div>
  )
}

// 以真实软件桌面尺寸渲染，再整体等比缩放适配右侧容器宽度，
// 保证内部比例、字号、间距与真实软件完全一致（不变形）。
// 真实 Cloud-PE One 的 Tauri 窗口默认尺寸（src-tauri/tauri.conf.json：1024×630，
// minHeight 630）。用它当设计尺寸，侧栏 10 项 + 折叠按钮都能完整显示，比例与真实软件一致。
const DESIGN_W = 1024
const DESIGN_H = 630

const CloudPeAppPreview: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.8)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(el.clientWidth / DESIGN_W)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden border bg-card shadow-xl ring-1 ring-black/5 dark:ring-white/5"
      // 圆角随缩放比例走：app 画面越小（手机端）圆角越小，比例统一
      style={{ height: DESIGN_H * scale, borderRadius: Math.max(4, Math.round(14 * scale)) }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})` }}
      >
        <AppWindow />
      </div>
    </div>
  )
}

export default CloudPeAppPreview
