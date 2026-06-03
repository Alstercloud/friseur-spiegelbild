/**
 * React Hooks for Content Blocks
 * ===============================
 * Hooks to fetch content from Supabase content_blocks table
 */

import { useState, useEffect } from 'react';
import { supabase, supabaseConfigured } from '@/lib/supabase';
import type { ContentBlock } from '@/types/contentBlocks';

/**
 * Hook to fetch multiple content blocks by section
 * 
 * @param section - The section to fetch blocks for (e.g., 'hero', 'about', 'services')
 * @param blockType - Optional: Filter by specific block_type
 * @returns Object with blocks data, loading state, and error
 * 
 * @example
 * const { blocks, loading, error } = useContentBlocks('hero');
 * const { blocks, loading, error } = useContentBlocks('about', 'feature_card');
 */
export function useContentBlocks(section: string, blockType?: string) {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBlocks() {
      if (!supabaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('content_blocks')
          .select('*')
          .eq('section', section)
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        // Optional: Filter by block_type
        if (blockType) {
          query = query.eq('block_type', blockType);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        setBlocks(data || []);
      } catch (err) {
        console.error(`Error fetching content blocks for section "${section}":`, err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchBlocks();
  }, [section, blockType]);

  return { blocks, loading, error };
}

/**
 * Hook to fetch a single content block by block_key
 * 
 * @param blockKey - The unique block_key identifier
 * @returns Object with block data, loading state, and error
 * 
 * @example
 * const { block, loading, error } = useContentBlock('hero_main_content');
 * const { block, loading, error } = useContentBlock('about_feature_1');
 */
export function useContentBlock(blockKey: string) {
  const [block, setBlock] = useState<ContentBlock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBlock() {
      if (!supabaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('content_blocks')
          .select('*')
          .eq('block_key', blockKey)
          .eq('is_active', true)
          .single();

        if (fetchError) throw fetchError;

        setBlock(data);
      } catch (err) {
        console.error(`Error fetching content block with key "${blockKey}":`, err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchBlock();
  }, [blockKey]);

  return { block, loading, error };
}

/**
 * Hook to fetch content blocks grouped by block_type
 * Useful when you need multiple types from the same section
 * 
 * @param section - The section to fetch blocks for
 * @param blockTypes - Array of block types to fetch
 * @returns Object with grouped blocks, loading state, and error
 * 
 * @example
 * const { blocksByType, loading, error } = useContentBlocksByType('about', ['text_paragraph', 'feature_card']);
 * // Returns: { text_paragraph: [...], feature_card: [...] }
 */
export function useContentBlocksByType(section: string, blockTypes: string[]) {
  const [blocksByType, setBlocksByType] = useState<Record<string, ContentBlock[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBlocks() {
      if (!supabaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('content_blocks')
          .select('*')
          .eq('section', section)
          .in('block_type', blockTypes)
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (fetchError) throw fetchError;

        // Group blocks by type
        const grouped = (data || []).reduce((acc, block) => {
          if (!acc[block.block_type]) {
            acc[block.block_type] = [];
          }
          acc[block.block_type].push(block);
          return acc;
        }, {} as Record<string, ContentBlock[]>);

        setBlocksByType(grouped);
      } catch (err) {
        console.error(`Error fetching grouped content blocks for section "${section}":`, err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    fetchBlocks();
  }, [section, blockTypes.join(',')]);

  return { blocksByType, loading, error };
}

/**
 * Hook to fetch hero section content
 * Convenience hook with proper typing for hero section
 * 
 * @returns Object with hero blocks, loading state, and error
 * 
 * @example
 * const { heroMain, heroBackground, heroCTA, loading } = useHeroContent();
 */
export function useHeroContent() {
  const { blocks, loading, error } = useContentBlocks('hero');

  const heroMain = blocks.find(b => b.block_type === 'hero_main') || null;
  const heroBackground = blocks.find(b => b.block_type === 'background_image') || null;
  const heroCTAs = blocks.filter(b => b.block_type === 'cta_button');

  return {
    heroMain,
    heroBackground,
    heroCTAs,
    loading,
    error,
  };
}

/**
 * Hook to fetch about section content
 * Convenience hook with proper typing for about section
 * 
 * @returns Object with about blocks grouped by type, loading state, and error
 * 
 * @example
 * const { header, paragraphs, image, features, loading } = useAboutContent();
 */
export function useAboutContent() {
  const { blocks, loading, error } = useContentBlocks('about');

  const header = blocks.find(b => b.block_type === 'section_header') || null;
  const paragraphs = blocks.filter(b => b.block_type === 'text_paragraph');
  const image = blocks.find(b => b.block_type === 'image') || null;
  const features = blocks.filter(b => b.block_type === 'feature_card');

  return {
    header,
    paragraphs,
    image,
    features,
    loading,
    error,
  };
}

/**
 * Hook to fetch services section content
 * Convenience hook with proper typing for services section
 * 
 * @returns Object with services blocks grouped by type, loading state, and error
 * 
 * @example
 * const { header, subsectionHeaders, images, specialCards, loading } = useServicesContent();
 */
export function useServicesContent() {
  const { blocks, loading, error } = useContentBlocks('services');

  const header = blocks.find(b => b.block_type === 'section_header') || null;
  const subsectionHeaders = blocks.filter(b => b.block_type === 'subsection_header');
  const images = blocks.filter(b => b.block_type === 'image');
  const specialCards = blocks.filter(b => b.block_type === 'special_card');

  return {
    header,
    subsectionHeaders,
    images,
    specialCards,
    loading,
    error,
  };
}

/**
 * Hook to fetch footer content
 * Convenience hook with proper typing for footer section
 * 
 * @returns Object with footer blocks, loading state, and error
 * 
 * @example
 * const { description, copyright, loading } = useFooterContent();
 */
export function useFooterContent() {
  const { blocks, loading, error } = useContentBlocks('footer');

  const description = blocks.find(b => b.block_type === 'description') || null;
  const copyright = blocks.find(b => b.block_type === 'copyright') || null;

  return {
    description,
    copyright,
    loading,
    error,
  };
}
