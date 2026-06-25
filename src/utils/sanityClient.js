import { createClient } from '@sanity/client';

const projectId = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SANITY_PROJECT_ID) 
  || 'o5ftfo6f';

export const roeCmsClient = createClient({
  projectId,
  dataset: 'production',
  useCdn: true, // CDN caches responses globally to make high-res luxury assets load instantly
  apiVersion: '2026-06-25', 
});

// An asynchronous function to pull all products dynamically into your store layout
export async function getLiveStorefrontInventory() {
  try {
    const query = `*[_type == "jewelryProduct"] | order(_createdAt desc){
      "id": _id,
      "title": itemName,
      price,
      description,
      "image": productImage.asset->url,
      category,
      tags,
      sizes,
      finishes
    }`;
    const data = await roeCmsClient.fetch(query);
    
    if (!data || data.length === 0) return [];

    return data.map(item => ({
      ...item,
      // Provide default fallback fields if they are missing from Sanity
      category: item.category || 'fine-jewelry',
      tags: item.tags && item.tags.length > 0 ? item.tags : ['Fine Jewelry'],
      sizes: item.sizes && item.sizes.length > 0 ? item.sizes : ['Small', 'Medium', 'Large'],
      finishes: item.finishes && item.finishes.length > 0 ? item.finishes : ['Yellow Gold', 'White Gold']
    }));
  } catch (error) {
    console.error("Error fetching live inventory from Sanity CMS:", error);
    return [];
  }
}
