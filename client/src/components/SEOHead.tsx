import { useEffect } from 'react'
import { useSeoMeta } from '@/hooks/useSupabaseData'

interface SEOHeadProps {
  pageSlug: string
  fallback?: {
    title?: string
    description?: string
  }
}

export function SEOHead({ pageSlug, fallback }: SEOHeadProps) {
  const { data: seoData, loading } = useSeoMeta(pageSlug)

  useEffect(() => {
    if (loading) return

    const title = seoData?.meta_title || fallback?.title || 'Friseur Spiegelbild'
    const description = seoData?.meta_description || fallback?.description || ''
    const ogTitle = seoData?.og_title || title
    const ogDescription = seoData?.og_description || description
    const ogImage = seoData?.og_image || '/og-image.jpg'
    const canonicalUrl = seoData?.canonical_url || window.location.href

    // Set document title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Basic meta tags
    updateMetaTag('description', description)
    
    // Open Graph tags
    updateMetaTag('og:title', ogTitle, true)
    updateMetaTag('og:description', ogDescription, true)
    updateMetaTag('og:image', ogImage, true)
    updateMetaTag('og:url', canonicalUrl, true)
    updateMetaTag('og:type', 'website', true)
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', ogTitle)
    updateMetaTag('twitter:description', ogDescription)
    updateMetaTag('twitter:image', ogImage)

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = canonicalUrl

    // Schema.org JSON-LD
    if (seoData?.schema_markup) {
      let schemaScript = document.getElementById('schema-jsonld') as HTMLScriptElement
      if (!schemaScript) {
        schemaScript = document.createElement('script')
        schemaScript.id = 'schema-jsonld'
        schemaScript.type = 'application/ld+json'
        document.head.appendChild(schemaScript)
      }
      schemaScript.textContent = JSON.stringify(seoData.schema_markup)
    }
  }, [seoData, loading, pageSlug, fallback])

  return null // This component only manages head tags
}
