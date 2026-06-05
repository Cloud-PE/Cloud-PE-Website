import { useState, useEffect } from 'react'

interface VersionInfo {
  peVersion: string | null
  hubVersion: string | null
  loading: boolean
  error: string | null
}

export const useVersionInfo = (): VersionInfo => {
  const [peVersion, setPeVersion] = useState<string | null>(null)
  const [hubVersion, setHubVersion] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVersionInfo = async () => {
      try {
        const response = await fetch('https://api.cloud-pe.cn/GetInfo/')
        if (!response.ok) {
          throw new Error('Failed to fetch version info')
        }
        const data = await response.json()
        setPeVersion(data.data?.cloud_pe || null)
        setHubVersion(data.hub_new?.hub_ver || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchVersionInfo()
  }, [])

  return { peVersion, hubVersion, loading, error }
}
