import { Link } from 'react-router-dom'
import { Download, Users, Shield, Rocket, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageWithLoading } from '@/components/common'
import CloudPeAppPreview from '@/components/common/CloudPeAppPreview'
import { FramedSection } from '@/components/layout'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { useT } from '@/lib/i18n'

const featureIcons = [Shield, Rocket, Sparkles]

const SHOTS = [
  'https://pic1.imgdb.cn/item/6905c7333203f7be00bf5cee.png',
  'https://pic1.imgdb.cn/item/6905c7323203f7be00bf5ce8.png',
  'https://pic1.imgdb.cn/item/6869065258cb8da5c8914722.png',
  'https://pic1.imgdb.cn/item/6869062858cb8da5c89146e2.png',
]

const Home: React.FC = () => {
  const t = useT()

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="container py-12 md:py-16 lg:py-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-6 xl:gap-10">
            {/* 左：文案 */}
            <div className="flex flex-col items-start gap-6 text-left lg:w-[32%] lg:shrink-0">
              <h1 className="font-heading text-4xl leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
                {t.home.heroTitleLines[0]}
                <br />
                {t.home.heroTitleLines[1]}
              </h1>
              <p className="max-w-xl text-balance text-muted-foreground md:text-lg">
                {t.home.heroDesc}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" render={<Link to="/download" />}>
                  <Download className="size-5" />
                  {t.home.download}
                </Button>
                <Button variant="outline" size="lg" render={<Link to="/qqg" />}>
                  <Users className="size-5" />
                  {t.home.joinCommunity}
                </Button>
              </div>
            </div>

            {/* 右：Cloud-PE One 界面预览（原生 coss ui，等比缩放，明暗随官网） */}
            <div className="w-full lg:min-w-0 lg:flex-1">
              <CloudPeAppPreview />
            </div>
          </div>
        </div>
      </section>

      {/* 特性 */}
      <FramedSection className="py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-heading text-3xl tracking-tight md:text-4xl">
            {t.home.featuresTitle}
          </h2>
          <p className="mt-3 text-muted-foreground md:text-lg">{t.home.featuresDesc}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.home.features.map((feature, i) => {
            const Icon = featureIcons[i]
            return (
              <Card key={feature.title} className="gap-4 transition-colors hover:border-foreground/20">
                <CardHeader>
                  <div className="mb-1 flex size-10 items-center justify-center rounded-lg border bg-muted/40 text-foreground">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">{feature.desc}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </FramedSection>

      {/* 截图 */}
      <FramedSection className="py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-heading text-3xl tracking-tight md:text-4xl">{t.home.shotsTitle}</h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">{t.home.shotsDesc}</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-10">
          {SHOTS.map((url, i) => (
            <figure key={url} className="space-y-3">
              <div className="overflow-hidden rounded-xl border bg-clip-padding shadow-xs">
                <ImageWithLoading
                  src={url}
                  alt={t.home.shots[i]}
                  className="block w-full"
                  wrapperClassName="w-full"
                  rounded="rounded-none"
                  loadingMinHeight="200px"
                  loading="lazy"
                />
              </div>
              <figcaption className="text-center text-sm text-muted-foreground">
                {t.home.shots[i]}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-12 text-center font-heading text-lg text-foreground">
          {t.home.moreToExplore}
        </p>
      </FramedSection>
    </>
  )
}

export default Home
