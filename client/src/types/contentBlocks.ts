/**
 * TypeScript Types for content_blocks table
 */

export interface ContentBlock {
  id: string;
  section: string;
  block_type: string;
  block_key: string | null;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
  image_alt: string | null;
  image_width: number | null;
  image_height: number | null;
  cta_text: string | null;
  cta_url: string | null;
  cta_target: string | null;
  icon_name: string | null;
  badge_text: string | null;
  sort_order: number;
  is_active: boolean;
  metadata: Record<string, any> | null;
  responsive_images: ResponsiveImage[] | null;
  created_at: string;
  updated_at: string;
}

export interface ResponsiveImage {
  size: string;
  url: string;
  media_query: string;
}

export interface HeroBlock extends ContentBlock {
  section: 'hero';
  block_type: 'hero_main' | 'background_image' | 'cta_button';
}

export interface AboutBlock extends ContentBlock {
  section: 'about';
  block_type: 'section_header' | 'text_paragraph' | 'image' | 'feature_card';
}

export interface ServicesBlock extends ContentBlock {
  section: 'services';
  block_type: 'section_header' | 'subsection_header' | 'image' | 'special_card';
}

export interface TestimonialsBlock extends ContentBlock {
  section: 'testimonials';
  block_type: 'section_header';
}

export interface ContactBlock extends ContentBlock {
  section: 'contact';
  block_type: 'section_header';
}

export interface FooterBlock extends ContentBlock {
  section: 'footer';
  block_type: 'description' | 'copyright';
}
