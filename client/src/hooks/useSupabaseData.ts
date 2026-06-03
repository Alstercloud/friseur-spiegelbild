import { useEffect, useState } from 'react'
import { supabase, supabaseConfigured } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Tables = Database['public']['Tables']

// Generic hook for any table
export function useSupabaseData<T extends keyof Tables>(
  table: T,
  options?: {
    filter?: any
    orderBy?: { column: string; ascending?: boolean }
    limit?: number
  }
) {
  const [data, setData] = useState<Tables[T]['Row'][] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (!supabaseConfigured) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        let query = supabase.from(table).select('*')

        if (options?.filter) {
          Object.entries(options.filter).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
        }

        if (options?.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? true,
          })
        }

        if (options?.limit) {
          query = query.limit(options.limit)
        }

        const { data, error } = await query

        if (error) throw error
        setData(data as Tables[T]['Row'][])
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [table, JSON.stringify(options)])

  return { data, loading, error }
}

// Specific hooks for better DX
export function useTeamMembers() {
  return useSupabaseData('team_members', {
    filter: { is_active: true },
    orderBy: { column: 'sort_order' },
  })
}

export function useServices(category?: 'ladies' | 'men' | 'special') {
  return useSupabaseData('services', {
    filter: category ? { is_active: true, category } : { is_active: true },
    orderBy: { column: 'sort_order' },
  })
}

export function useSettings(key: string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSetting() {
      if (!supabaseConfigured) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('settings')
          .select('value')
          .eq('key', key)
          .single()

        if (error) throw error
        setData(data?.value)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchSetting()
  }, [key])

  return { data, loading, error }
}

export function useSeoMeta(pageSlug: string) {
  const [data, setData] = useState<Tables['seo_meta']['Row'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSeoMeta() {
      if (!supabaseConfigured) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('seo_meta')
          .select('*')
          .eq('page_slug', pageSlug)
          .single()

        if (error) throw error
        setData(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchSeoMeta()
  }, [pageSlug])

  return { data, loading, error }
}
