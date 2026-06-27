import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface Row {
  rank: number
  name: string
  count: number
}

const T = {
  zh: { rank: '排名', name: '名称', done: '已贡献', loading: '获取中…', failed: '获取失败', total: '总贡献数目：', unit: ' 个', nth: (n: number) => `第 ${n} 名` },
  en: { rank: 'Rank', name: 'Name', done: 'Plugins', loading: 'Loading…', failed: 'Failed to load', total: 'Total contributions: ', unit: '', nth: (n: number) => `#${n}` },
}

export default function Contributors({ en = false }: { en?: boolean }) {
  const t = en ? T.en : T.zh
  const [rows, setRows] = useState<Row[] | null>(null)

  useEffect(() => {
    let cancelled = false
    let timer: number | undefined
    const load = () => {
      fetch('https://api.cloud-pe.cn/v2/plugins.json')
        .then((r) => {
          if (!r.ok) throw new Error('bad response')
          return r.json()
        })
        .then((data) => {
          if (cancelled) return
          const counter = new Map<string, number>()
          for (const cat of data.data ?? []) {
            for (const plugin of cat.list ?? []) {
              const author = String(plugin.author ?? '').trim()
              if (author) counter.set(author, (counter.get(author) ?? 0) + 1)
            }
          }
          setRows(
            [...counter.entries()]
              .sort((a, b) => b[1] - a[1])
              .map(([name, count], i) => ({ rank: i + 1, name, count })),
          )
        })
        .catch(() => {
          // 拉取失败：保持骨架屏，8 秒后自动重试（不显示"获取失败"）
          if (!cancelled) timer = window.setTimeout(load, 8000)
        })
    }
    load()
    return () => {
      cancelled = true
      if (timer) window.clearTimeout(timer)
    }
  }, [])

  if (!rows)
    return (
      <div className="not-prose my-4" aria-busy="true" aria-label={t.loading}>
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-border border-b bg-card">
                <th className="px-4 py-2 text-left font-semibold">{t.rank}</th>
                <th className="px-4 py-2 text-left font-semibold">{t.name}</th>
                <th className="px-4 py-2 text-left font-semibold">{t.done}</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-t border-border/60">
                  <td className="px-4 py-2.5">
                    <Skeleton className="h-4 w-10" />
                  </td>
                  <td className="px-4 py-2.5">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="px-4 py-2.5">
                    <Skeleton className="h-4 w-8" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )

  const total = rows.reduce((s, r) => s + r.count, 0)

  return (
    <div className="not-prose my-4">
      <div className="max-h-[28rem] overflow-auto rounded-xl border">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0">
            <tr className="border-border border-b bg-card">
              <th className="px-4 py-2 text-left font-semibold">{t.rank}</th>
              <th className="px-4 py-2 text-left font-semibold">{t.name}</th>
              <th className="px-4 py-2 text-left font-semibold">{t.done}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.rank} className="border-t border-border/60">
                <td className="px-4 py-2 text-muted-foreground">{t.nth(r.rank)}</td>
                <td className="px-4 py-2">
                  {r.rank <= 3 ? <strong>{r.name}</strong> : r.name}
                </td>
                <td className="px-4 py-2">{r.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-muted-foreground text-sm">
        {t.total}
        <strong className="text-foreground">
          {total}
          {t.unit}
        </strong>
      </p>
    </div>
  )
}
