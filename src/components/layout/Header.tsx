import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon, Check, Github } from 'lucide-react'
import { CircleHalf } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'
import {
  Menu as DropdownMenu,
  MenuPopup,
  MenuItem,
  MenuTrigger,
} from '@/components/ui/menu'

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const location = useLocation()

  const navItems = [
    { name: '首页', path: '/', external: false },
    { name: '文档', path: 'https://docs.cloud-pe.cn', external: true },
    { name: '下载', path: '/download', external: false },
  ]

  const isActive = (path: string) => location.pathname === path

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const getThemeIcon = () => {
    if (theme === 'system') {
      return <CircleHalf className="h-[18px] w-[18px]" />
    }
    return resolvedTheme === 'dark' ? (
      <Moon className="h-[18px] w-[18px]" />
    ) : (
      <Sun className="h-[18px] w-[18px]" />
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo */}
        <Link to="/" className="mr-8 flex items-center gap-2 group">
          <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            Cloud-PE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-end gap-1">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.name}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-all"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
              </Link>
            )
          )}

          {/* Github Button */}
          <Button
            variant="outline"
            size="sm"
            className="button-header"
            render={
              <a
                href="https://github.com/Cloud-PE/Cloud-PE-One"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <Github className="size-4 mr-1.5" />
            Github
          </Button>

          {/* Theme Toggle */}
          <DropdownMenu>
            <MenuTrigger
              render={
                <Button variant="outline" size="icon" className="ml-2 rounded-lg button-header">
                  {getThemeIcon()}
                  <span className="sr-only">切换主题</span>
                </Button>
              }
            />
            <MenuPopup className="min-w-[140px] menu-popup-animated">
              <MenuItem
                onClick={() => setTheme('light')}
                className="flex items-center gap-2"
              >
                <Sun className="h-4 w-4" />
                浅色模式
                {theme === 'light' && <Check className="ml-auto h-4 w-4" />}
              </MenuItem>
              <MenuItem
                onClick={() => setTheme('dark')}
                className="flex items-center gap-2"
              >
                <Moon className="h-4 w-4" />
                深色模式
                {theme === 'dark' && <Check className="ml-auto h-4 w-4" />}
              </MenuItem>
              <MenuItem
                onClick={() => setTheme('system')}
                className="flex items-center gap-2"
              >
                <CircleHalf className="h-4 w-4" />
                跟随系统
                {theme === 'system' && <Check className="ml-auto h-4 w-4" />}
              </MenuItem>
            </MenuPopup>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex flex-1 items-center justify-end gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="rounded-lg button-header"
          >
            {getThemeIcon()}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg button-header"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t" id="mobile-menu">
          <nav className="flex flex-col space-y-2 p-4">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            <a
              href="https://github.com/Cloud-PE/Cloud-PE-One"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Github
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header