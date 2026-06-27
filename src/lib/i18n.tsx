import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'zh' | 'en'

const STORAGE_KEY = 'cloud-pe-lang'

function detectInitial(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'zh' || saved === 'en') return saved
  } catch {
    /* ignore */
  }
  if (
    typeof navigator !== 'undefined' &&
    !navigator.language.toLowerCase().startsWith('zh')
  ) {
    return 'en'
  }
  return 'zh'
}

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
}

const LangContext = createContext<LangContextValue>({
  lang: 'zh',
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitial)

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN'
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

export function useT(): Dict {
  return translations[useLang().lang]
}

/* ========================== 翻译字典 ========================== */

interface Dict {
  nav: {
    home: string
    docs: string
    download: string
    community: string
    menu: string
    docsHeading: string
  }
  common: {
    github: string
    toggleTheme: string
    light: string
    dark: string
    system: string
    language: string
    zh: string
    en: string
  }
  home: {
    heroTitleLines: string[]
    heroDesc: string
    download: string
    joinCommunity: string
    mainShotAlt: string
    featuresTitle: string
    featuresDesc: string
    features: { title: string; desc: string }[]
    shotsTitle: string
    shotsDesc: string
    shots: string[]
    moreToExplore: string
  }
  download: {
    title: string
    desc: string
    noticePluginBefore: string
    noticePluginLink: string
    noticePluginAfter: string
    noticeDocsBefore: string
    noticeDocsLink: string
    noticeDocsAfter: string
    recommended: string
    items: { title: string; desc: string; cta: string }[]
    agreementPrefix: string
    agreementLink: string
  }
  qqgroup: {
    title: string
    desc: string
    groupName: string
    capacity: string
    status: string
    viewQr: string
    join: string
    qrAlt: string
  }
  footer: {
    friends: string
    crafted: string
  }
  notFound: {
    title: string
    desc: string
    home: string
  }
  docs: {
    copyMarkdown: string
    copied: string
    onThisPage: string
    notFound: string
    notFoundDesc: string
    searchLabel: string
    searchPlaceholder: string
    searchEmpty: string
    searchEmptyHint: string
    goToPage: string
  }
}

const zh: Dict = {
  nav: {
    home: '主页',
    docs: '文档',
    download: '下载',
    community: '社区',
    menu: '菜单',
    docsHeading: '文档',
  },
  common: {
    github: 'GitHub 仓库',
    toggleTheme: '切换主题',
    light: '浅色模式',
    dark: '深色模式',
    system: '跟随系统',
    language: '语言',
    zh: '简体中文',
    en: 'English',
  },
  home: {
    heroTitleLines: ['一款实用的', '维护 PE'],
    heroDesc:
      '免费、纯净、强大、美观的 Win11 PE，支持系统维护与网络娱乐，可加载 CE-插件和 HotPE 模块。',
    download: '立即下载',
    joinCommunity: '加入社区',
    mainShotAlt: 'Cloud-PE 主界面预览',
    featuresTitle: '为什么选择我们？',
    featuresDesc:
      '内置主流无线网卡、有线网卡、触摸、声卡、磁盘驱动，拥有极高的兼容性。',
    features: [
      { title: '免费纯净', desc: '完全免费 · 无广告 · 无劫持 · 无后门 · 清爽体验。' },
      { title: '强大兼容', desc: '丰富驱动支持 · 超强兼容性 · 插件扩展 · 无限可能。' },
      { title: '现代美学', desc: '简洁界面设计 · 符合当代审美 · 视觉舒适。' },
    ],
    shotsTitle: '系统截图',
    shotsDesc:
      '下图仅演示 Cloud-PE 的部分功能（含 CE-插件、自带工具等），截图不定时更新，请以实际为准。',
    shots: [
      '初始资源占用情况，2GB 内存也能完美使用。',
      'Cloud-插件市场搭配 Cloud-小助手，完美支持获取、搜索、管理和加载 CE-插件以及 HotPE 模块。',
      '内置 Chromium 浏览器，支持绝大多数网站，占用低。',
      '支持全局暗黑。',
    ],
    moreToExplore: '更多功能请自行探索',
  },
  download: {
    title: '下载',
    desc: '获取最新版本的 Cloud-PE',
    noticePluginBefore: '在此处下载的 Cloud-PE 不含插件，插件请前往',
    noticePluginLink: '下载站',
    noticePluginAfter: '获取，官方源更安全。',
    noticeDocsBefore: '强烈建议先阅读',
    noticeDocsLink: '文档',
    noticeDocsAfter: '再使用，那里有常见问题的解决方案。',
    recommended: '推荐',
    items: [
      { title: 'Cloud-PE One', desc: '推荐使用 Cloud-PE One 制作启动盘，简单方便。', cta: '下载' },
      { title: 'Cloud-PE ISO', desc: '纯净 ISO 文件，适合高级用户。', cta: '下载' },
      { title: 'CE-插件', desc: '扩展功能插件，按需下载。', cta: '前往下载' },
    ],
    agreementPrefix: '使用 Cloud-PE 及其相关功能，即表示您已阅读并同意',
    agreementLink: 'Cloud-PE 用户协议',
  },
  qqgroup: {
    title: '加入社区',
    desc: '加入官方 QQ 群，与其他用户交流使用心得',
    groupName: 'Cloud-PE 交流群',
    capacity: '500人',
    status: '可用',
    viewQr: '查看二维码',
    join: '点击加入',
    qrAlt: '群二维码',
  },
  footer: {
    friends: '友情链接',
    crafted: '由 Cloud-PE Dev 用心打造',
  },
  notFound: {
    title: '页面不存在',
    desc: '你访问的页面可能已被移动或删除，请检查网址是否正确。',
    home: '返回首页',
  },
  docs: {
    copyMarkdown: '复制 Markdown',
    copied: '已复制',
    onThisPage: '当前页大纲',
    notFound: '页面不存在',
    notFoundDesc: '没有找到这篇文档，请从左侧目录重新选择。',
    searchLabel: '搜索文档',
    searchPlaceholder: '搜索文档…',
    searchEmpty: '没有找到相关内容',
    searchEmptyHint: '换个关键词试试',
    goToPage: '跳转到页面',
  },
}

const en: Dict = {
  nav: {
    home: 'Home',
    docs: 'Docs',
    download: 'Download',
    community: 'Community',
    menu: 'Menu',
    docsHeading: 'Documentation',
  },
  common: {
    github: 'GitHub repository',
    toggleTheme: 'Toggle theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    language: 'Language',
    zh: '简体中文',
    en: 'English',
  },
  home: {
    heroTitleLines: ['A practical', 'Windows PE toolkit'],
    heroDesc:
      'A free, clean, powerful and beautiful Windows 11 PE for system maintenance and online use — with CE plugins and HotPE modules.',
    download: 'Download',
    joinCommunity: 'Join Community',
    mainShotAlt: 'Cloud-PE main interface preview',
    featuresTitle: 'Why choose us?',
    featuresDesc:
      'Bundled mainstream Wi-Fi, Ethernet, touch, audio and disk drivers for exceptional compatibility.',
    features: [
      { title: 'Free & Clean', desc: 'Completely free · no ads · no hijacking · no backdoors · a clean experience.' },
      { title: 'Powerful & Compatible', desc: 'Rich driver support · superb compatibility · plugin extensions · endless possibilities.' },
      { title: 'Modern Aesthetics', desc: 'Clean interface design · contemporary look · easy on the eyes.' },
    ],
    shotsTitle: 'Screenshots',
    shotsDesc:
      'The shots below show only part of Cloud-PE (CE plugins, built-in tools, etc.) and are updated from time to time — refer to the actual build.',
    shots: [
      'Initial resource usage — works great even with 2 GB of RAM.',
      'Cloud Plugin Market plus Cloud Assistant: fetch, search, manage and load CE plugins and HotPE modules.',
      'Built-in Chromium browser supports most websites with low overhead.',
      'Full dark mode supported.',
    ],
    moreToExplore: 'Explore the rest yourself',
  },
  download: {
    title: 'Download',
    desc: 'Get the latest version of Cloud-PE',
    noticePluginBefore: 'Cloud-PE downloaded here does not include plugins. Get plugins from the',
    noticePluginLink: 'download site',
    noticePluginAfter: '— the official source is safer.',
    noticeDocsBefore: 'We strongly recommend reading the',
    noticeDocsLink: 'docs',
    noticeDocsAfter: 'first — they cover solutions to common problems.',
    recommended: 'Recommended',
    items: [
      { title: 'Cloud-PE One', desc: 'Recommended — build a boot drive easily with Cloud-PE One.', cta: 'Download' },
      { title: 'Cloud-PE ISO', desc: 'A clean ISO file for advanced users.', cta: 'Download' },
      { title: 'CE Plugins', desc: 'Extension plugins — download as needed.', cta: 'Go to download' },
    ],
    agreementPrefix: 'By using Cloud-PE and its features, you have read and agree to the',
    agreementLink: 'Cloud-PE User Agreement',
  },
  qqgroup: {
    title: 'Join the Community',
    desc: 'Join the official QQ group and share tips with other users',
    groupName: 'Cloud-PE Group',
    capacity: '500 members',
    status: 'Open',
    viewQr: 'View QR code',
    join: 'Join',
    qrAlt: 'group QR code',
  },
  footer: {
    friends: 'Friends',
    crafted: 'Crafted with care by Cloud-PE Dev',
  },
  notFound: {
    title: 'Page not found',
    desc: 'The page you are looking for may have been moved or deleted. Please check the URL.',
    home: 'Back to home',
  },
  docs: {
    copyMarkdown: 'Copy Markdown',
    copied: 'Copied',
    onThisPage: 'On this page',
    notFound: 'Page not found',
    notFoundDesc: 'This document could not be found. Please pick another from the menu.',
    searchLabel: 'Search docs',
    searchPlaceholder: 'Search documentation…',
    searchEmpty: 'No results found.',
    searchEmptyHint: 'Try a different keyword',
    goToPage: 'Go to Page',
  },
}

const translations: Record<Lang, Dict> = { zh, en }
