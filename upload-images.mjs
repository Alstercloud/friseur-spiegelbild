#!/usr/bin/env node

/**
 * SUPABASE IMAGE UPLOAD SCRIPT
 * ==============================
 * Uploads all images from /client/public/ to Supabase Storage
 * and updates database URLs automatically
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './client/.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in client/.env');
  console.error('   VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Image mapping: local file -> Supabase path
const IMAGE_MAPPING = {
  // Hero Section
  'hero-banner.webp': 'hero/hero-banner-lg.webp',
  'hero-banner-sm.webp': 'hero/hero-banner-sm.webp',
  'hero-banner-md.webp': 'hero/hero-banner-md.webp',
  'hero-banner-lg.webp': 'hero/hero-banner-lg.webp',
  
  // Team Members
  'jennifer-tevs-red-dress.webp': 'team/jennifer-tevs-red-dress.webp',
  'farbe-service.webp': 'team/jenifer-fenske.webp', // Using this as Jenifer's image
  
  // About Section
  'jennifer-tevs-superstar-nobg.webp': 'about/jennifer-tevs-superstar-nobg.webp',
  'jennifer-tevs-superstar-nobg-sm.webp': 'about/jennifer-tevs-superstar-nobg-sm.webp',
  'jennifer-tevs-superstar-nobg-md.webp': 'about/jennifer-tevs-superstar-nobg-md.webp',
  
  // Services Section
  'service-ladies.webp': 'services/service-ladies-md.webp',
  'service-ladies-sm.webp': 'services/service-ladies-sm.webp',
  'service-ladies-md.webp': 'services/service-ladies-md.webp',
  'service-men.webp': 'services/service-men-md.webp',
  'service-men-sm.webp': 'services/service-men-sm.webp',
  'service-men-md.webp': 'services/service-men-md.webp',
  'hair-extension.webp': 'services/hair-extension-lg.webp',
  'hair-extension-sm.webp': 'services/hair-extension-sm.webp',
  'hair-extension-md.webp': 'services/hair-extension-md.webp',
  'hair-extension-lg.webp': 'services/hair-extension-lg.webp',
  'relaxation-treatment.webp': 'services/relaxation-treatment-lg.webp',
  'relaxation-treatment-sm.webp': 'services/relaxation-treatment-sm.webp',
  'relaxation-treatment-md.webp': 'services/relaxation-treatment-md.webp',
  'relaxation-treatment-lg.webp': 'services/relaxation-treatment-lg.webp',
};

/**
 * Upload a single image to Supabase Storage
 */
async function uploadImage(localPath, supabasePath) {
  try {
    // Read the file
    const fileBuffer = await fs.readFile(localPath);
    
    // Determine content type
    const ext = path.extname(localPath).toLowerCase();
    const contentType = ext === '.webp' ? 'image/webp' :
                       ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
                       ext === '.png' ? 'image/png' :
                       'image/webp';
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(supabasePath, fileBuffer, {
        contentType,
        upsert: true, // Overwrite if exists
      });
    
    if (error) {
      console.error(`   ❌ Failed: ${error.message}`);
      return null;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(supabasePath);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return null;
  }
}

/**
 * Update database URLs
 */
async function updateDatabaseUrls(uploadedImages) {
  console.log('\n📝 Updating database URLs...\n');
  
  const updates = [
    // Hero Background
    {
      table: 'content_blocks',
      key: 'hero_background',
      url: uploadedImages['hero/hero-banner-lg.webp'],
      query: { block_key: 'hero_background' }
    },
    
    // About Jennifer Image
    {
      table: 'content_blocks',
      key: 'about_jennifer_image',
      url: uploadedImages['about/jennifer-tevs-superstar-nobg-md.webp'] || uploadedImages['about/jennifer-tevs-superstar-nobg.webp'],
      query: { block_key: 'about_jennifer_image' }
    },
    
    // Services Images
    {
      table: 'content_blocks',
      key: 'services_ladies_image',
      url: uploadedImages['services/service-ladies-md.webp'],
      query: { block_key: 'services_ladies_image' }
    },
    {
      table: 'content_blocks',
      key: 'services_men_image',
      url: uploadedImages['services/service-men-md.webp'],
      query: { block_key: 'services_men_image' }
    },
    {
      table: 'content_blocks',
      key: 'services_extension_image',
      url: uploadedImages['services/hair-extension-lg.webp'],
      query: { block_key: 'services_extension_image' }
    },
    {
      table: 'content_blocks',
      key: 'services_relaxation_image',
      url: uploadedImages['services/relaxation-treatment-lg.webp'],
      query: { block_key: 'services_relaxation_image' }
    },
    
    // Team Members
    {
      table: 'team_members',
      key: 'jennifer_tevs',
      url: uploadedImages['team/jennifer-tevs-red-dress.webp'],
      query: { name: 'Jennifer Tevs' }
    },
    {
      table: 'team_members',
      key: 'jenifer_fenske',
      url: uploadedImages['team/jenifer-fenske.webp'],
      query: { name: 'Jenifer Fenske' }
    },
  ];
  
  let successCount = 0;
  
  for (const update of updates) {
    if (!update.url) {
      console.log(`   ⏭️  Skipping ${update.key} (no URL)`);
      continue;
    }
    
    const { error } = await supabase
      .from(update.table)
      .update({ image_url: update.url })
      .match(update.query);
    
    if (error) {
      console.error(`   ❌ Failed to update ${update.key}: ${error.message}`);
    } else {
      console.log(`   ✅ Updated ${update.key}`);
      successCount++;
    }
  }
  
  console.log(`\n✅ Updated ${successCount}/${updates.length} database records\n`);
}

/**
 * Main upload function
 */
async function main() {
  console.log('🚀 SUPABASE IMAGE UPLOAD SCRIPT');
  console.log('================================\n');
  
  const publicDir = path.join(__dirname, 'client', 'public');
  const uploadedImages = {};
  
  console.log(`📂 Scanning: ${publicDir}\n`);
  
  let uploadCount = 0;
  let skipCount = 0;
  
  for (const [localFile, supabasePath] of Object.entries(IMAGE_MAPPING)) {
    const localPath = path.join(publicDir, localFile);
    
    // Check if file exists
    try {
      await fs.access(localPath);
    } catch {
      console.log(`   ⏭️  Skip: ${localFile} (not found)`);
      skipCount++;
      continue;
    }
    
    console.log(`📤 Uploading: ${localFile} → ${supabasePath}`);
    
    const publicUrl = await uploadImage(localPath, supabasePath);
    
    if (publicUrl) {
      console.log(`   ✅ Success: ${publicUrl}\n`);
      uploadedImages[supabasePath] = publicUrl;
      uploadCount++;
    } else {
      console.log('');
      skipCount++;
    }
  }
  
  console.log(`\n📊 Upload Summary:`);
  console.log(`   ✅ Uploaded: ${uploadCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount}`);
  console.log(`   📝 Total: ${Object.keys(IMAGE_MAPPING).length}\n`);
  
  // Update database
  if (uploadCount > 0) {
    await updateDatabaseUrls(uploadedImages);
  }
  
  console.log('🎉 DONE! All images uploaded and database updated!\n');
}

// Run the script
main().catch(console.error);
