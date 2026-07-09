// 文档（cosspress markdown）加载与导航。Markdown 在构建期由 plugins/markdown.ts
// 转换成 { html, raw, frontmatter, headings } 模块。
// 路由对中英文统一（/docs/x），由语言上下文决定加载中文还是英文内容：
//   中文源文件 /docs/start/start.md      → 逻辑路由 /docs/start/start
//   英文源文件 /docs/en/start/start.md   → 逻辑路由 /docs/start/start（去掉 /en）

import type { Lang } from './i18n'

export interface Heading {
  level: number
  title: string
  slug: string
}

export interface DocFrontmatter {
  title?: string
  description?: string
  layout?: string
  [key: string]: unknown
}

export interface DocPageData {
  /** 逻辑路由，始终以 /docs 开头（中英文一致） */
  route: string
  /** 源文件路径，如 /docs/start/start.md 或 /docs/en/start/start.md */
  file: string
  html: string
  /** 原始 markdown 正文（去掉 frontmatter），用于"复制 Markdown" */
  raw: string
  frontmatter: DocFrontmatter
  headings: Heading[]
}

export interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

interface MarkdownModule {
  html: string
  raw: string
  frontmatter: DocFrontmatter
  headings: Heading[]
}

// 侧边栏：中英文链接一致（语言无关），仅文字不同。
export const sidebarZh: SidebarItem[] = [
  {
    text: '开始',
    items: [{ text: '写在前面', link: '/docs/start/start' }],
  },
  {
    text: '总览',
    items: [
      { text: '日志', link: '/docs/overview/log' },
      { text: '感谢', link: '/docs/overview/thanks' },
      { text: '用户协议', link: '/docs/overview/contract' },
    ],
  },
  {
    text: '常见问题',
    items: [
      { text: 'Cloud-PE 是什么？', link: '/docs/faq/what_cp' },
      { text: 'Cloud-PE One 是什么？', link: '/docs/faq/what_cpone' },
      { text: '是否有后门、流氓行为？', link: '/docs/faq/safety' },
      { text: 'Cloud-PE 支持 WIFI 吗？', link: '/docs/faq/wifi' },
    ],
  },
  {
    text: '教程',
    items: [
      { text: '如何下载 Cloud-PE 及插件？', link: '/docs/course/down' },
      { text: '如何使用 CE-插件？', link: '/docs/course/loadce' },
      { text: '如何使用 HotPE 模块？', link: '/docs/course/loadhpm' },
    ],
  },
  {
    text: '开发者文档',
    items: [
      { text: '制作 CE-插件', link: '/docs/devdoc/makece' },
      { text: '插件投稿', link: '/docs/devdoc/ce_con' },
      { text: 'PE 集成 CE-插件', link: '/docs/cooperation/addce' },
    ],
  },
  {
    text: '项目授权',
    items: [
      { text: '获取授权', link: '/docs/cooperation/permit' },
      { text: '项目规范', link: '/docs/cooperation/standard' },
    ],
  },
]

export const sidebarEn: SidebarItem[] = [
  {
    text: 'Getting Started',
    items: [{ text: 'Introduction', link: '/docs/start/start' }],
  },
  {
    text: 'Overview',
    items: [
      { text: 'Changelog', link: '/docs/overview/log' },
      { text: 'Thanks', link: '/docs/overview/thanks' },
      { text: 'User Agreement', link: '/docs/overview/contract' },
    ],
  },
  {
    text: 'FAQ',
    items: [
      { text: 'What is Cloud-PE?', link: '/docs/faq/what_cp' },
      { text: 'What is Cloud-PE One?', link: '/docs/faq/what_cpone' },
      { text: 'Any backdoors or malware?', link: '/docs/faq/safety' },
      { text: 'Does it support Wi-Fi?', link: '/docs/faq/wifi' },
    ],
  },
  {
    text: 'Tutorials',
    items: [
      { text: 'Downloading Cloud-PE & plugins', link: '/docs/course/down' },
      { text: 'Loading CE plugins', link: '/docs/course/loadce' },
      { text: 'Loading HotPE modules', link: '/docs/course/loadhpm' },
    ],
  },
  {
    text: 'Developer Docs',
    items: [
      { text: 'Making a CE plugin', link: '/docs/devdoc/makece' },
      { text: 'Submitting plugins', link: '/docs/devdoc/ce_con' },
      { text: 'Integrating CE plugins into a PE', link: '/docs/cooperation/addce' },
    ],
  },
  {
    text: 'Licensing',
    items: [
      { text: 'Get a license', link: '/docs/cooperation/permit' },
      { text: 'Project guidelines', link: '/docs/cooperation/standard' },
    ],
  },
]

export function getSidebar(lang: Lang): SidebarItem[] {
  return lang === 'en' ? sidebarEn : sidebarZh
}

// 构建期把每篇文档都吃进来（中英文都在）。
const modules = import.meta.glob<MarkdownModule>('/docs/**/*.md', {
  eager: true,
})

/** 源文件路径 → { 语言, 逻辑路由 } */
function fileToLogical(file: string): { lang: Lang; route: string } {
  const isEn = file.startsWith('/docs/en/')
  let route = file.replace(/^\/docs\/en/, '/docs').replace(/\.md$/, '')
  route = route.replace(/\/index$/, '')
  if (route.length > 1 && route.endsWith('/')) route = route.slice(0, -1)
  return { lang: isEn ? 'en' : 'zh', route: route || '/docs' }
}

const zhPages = new Map<string, DocPageData>()
const enPages = new Map<string, DocPageData>()

for (const [file, mod] of Object.entries(modules)) {
  if (mod.frontmatter?.layout === 'home') continue
  const { lang, route } = fileToLogical(file)
  const page: DocPageData = {
    route,
    file,
    html: mod.html,
    raw: mod.raw ?? '',
    frontmatter: mod.frontmatter ?? {},
    headings: mod.headings ?? [],
  }
  ;(lang === 'en' ? enPages : zhPages).set(route, page)
}

function normalize(path: string): string {
  const p = path.split('#')[0].split('?')[0]
  if (p.length > 1 && p.endsWith('/')) return p.slice(0, -1)
  return p || '/docs'
}

export function getDocPage(pathname: string, lang: Lang): DocPageData | undefined {
  const route = normalize(pathname)
  const primary = lang === 'en' ? enPages : zhPages
  return primary.get(route) ?? zhPages.get(route)
}

export function docTitle(page: DocPageData): string {
  if (page.frontmatter.title) return String(page.frontmatter.title)
  const h1 = page.headings.find((h) => h.level === 1)
  return h1?.title ?? page.route.split('/').filter(Boolean).pop() ?? '文档'
}

/** /docs 默认跳转到的第一篇文档（中英一致） */
export const firstDocLink = '/docs/start/start'

export function isActiveLink(pathname: string, link: string): boolean {
  return normalize(pathname) === normalize(link)
}
