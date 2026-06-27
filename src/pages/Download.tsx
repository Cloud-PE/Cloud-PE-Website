import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Download as DownloadIcon,
  Package,
  Disc3,
  Puzzle,
  Info,
  FileText,
  ArrowRight,
} from 'lucide-react'
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
  FramedSection,
} from '@/components/layout'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useT } from '@/lib/i18n'

const URLS = {
  one: 'https://p0.cloud-pe.cn/Cloud-PE%E6%96%87%E4%BB%B6/Cloud-PE%20One/Cloud-PE%20One.zip',
  iso: 'https://p0.cloud-pe.cn/Cloud-PE%E6%96%87%E4%BB%B6/ISO%E6%96%87%E4%BB%B6/Cloud-PE.iso',
  plugins:
    'https://files.cloud-pe.cn/%E4%B8%8B%E8%BD%BD/CE-%E6%8F%92%E4%BB%B6',
}

interface Versions {
  iso?: string
  one?: string
}

/** 拉取 Cloud-PE / Cloud-PE One 版本号（与日志页版本岛同源），失败自动重试。 */
function useVersions(): Versions | null {
  const [v, setV] = useState<Versions | null>(null)
  useEffect(() => {
    let cancelled = false
    let timer: number | undefined
    const load = () => {
      fetch('https://api.cloud-pe.cn/v2/data.json')
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad'))))
        .then((d) => {
          if (!cancelled)
            setV({ iso: d?.data?.cloud_pe_version, one: d?.cloud_pe_one?.version })
        })
        .catch(() => {
          if (!cancelled) timer = window.setTimeout(load, 8000)
        })
    }
    load()
    return () => {
      cancelled = true
      if (timer) window.clearTimeout(timer)
    }
  }, [])
  return v
}

/** 版本号小标签：加载中显示骨架，拿到则显示，拿不到则不显示。 */
function VersionTag({
  versions,
  k,
}: {
  versions: Versions | null
  k: keyof Versions
}) {
  if (versions === null) return <Skeleton className="h-5 w-16 rounded-md" />
  const v = versions[k]
  if (!v) return null
  return (
    <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 font-medium text-muted-foreground text-xs">
      {v}
    </span>
  )
}

const Download: React.FC = () => {
  const t = useT()
  const versions = useVersions()
  const [one, iso, plugins] = t.download.items

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>{t.download.title}</PageHeaderHeading>
        <PageHeaderDescription>{t.download.desc}</PageHeaderDescription>
      </PageHeader>

      <FramedSection className="py-12 md:py-16" containerClassName="max-w-4xl">
        {/* 提示（coss Alert） */}
        <div className="mb-8 space-y-3">
          <Alert variant="info">
            <Info />
            <AlertDescription>
              <span>
                {t.download.noticePluginBefore}{' '}
                <a
                  href="https://files.cloud-pe.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {t.download.noticePluginLink}
                </a>{' '}
                {t.download.noticePluginAfter}
              </span>
            </AlertDescription>
          </Alert>
          <Alert variant="warning">
            <FileText />
            <AlertDescription>
              <span>
                {t.download.noticeDocsBefore}{' '}
                <Link
                  to="/docs"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {t.download.noticeDocsLink}
                </Link>{' '}
                {t.download.noticeDocsAfter}
              </span>
            </AlertDescription>
          </Alert>
        </div>

        {/* 主推：Cloud-PE One */}
        <Card className="mb-5 gap-0 border-foreground/20 p-6 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <div className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Package className="size-7" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-heading text-xl">{one.title}</h3>
                <Badge className="leading-none">{t.download.recommended}</Badge>
                <VersionTag versions={versions} k="one" />
              </div>
              <p className="mt-1.5 text-muted-foreground text-sm">{one.desc}</p>
            </div>
            <Button
              size="lg"
              className="w-full shrink-0 sm:w-auto"
              render={
                <a href={URLS.one} target="_blank" rel="noopener noreferrer" />
              }
            >
              <DownloadIcon className="size-5 opacity-100" />
              {one.cta}
            </Button>
          </div>
        </Card>

        {/* 次要：Cloud-PE ISO + CE-插件 */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="mb-1 inline-flex size-10 items-center justify-center rounded-lg border bg-muted/40 text-foreground">
                <Disc3 className="size-5" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-base">{iso.title}</CardTitle>
                <VersionTag versions={versions} k="iso" />
              </div>
              <CardDescription>{iso.desc}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button
                variant="outline"
                className="w-full"
                render={
                  <a href={URLS.iso} target="_blank" rel="noopener noreferrer" />
                }
              >
                <DownloadIcon className="size-4 opacity-100" />
                {iso.cta}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-1 inline-flex size-10 items-center justify-center rounded-lg border bg-muted/40 text-foreground">
                <Puzzle className="size-5" />
              </div>
              <CardTitle className="text-base">{plugins.title}</CardTitle>
              <CardDescription>{plugins.desc}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button
                variant="outline"
                className="w-full"
                render={
                  <a
                    href={URLS.plugins}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <ArrowRight className="size-4 opacity-100" />
                {plugins.cta}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* 底部：用户协议 */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          {t.download.agreementPrefix}{' '}
          <Link
            to="/docs/overview/contract"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {t.download.agreementLink}
          </Link>
        </p>
      </FramedSection>
    </>
  )
}

export default Download
