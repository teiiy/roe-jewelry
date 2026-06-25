// This file establishes the exact data entry fields for Soso's luxury dashboard
export default {
  name: 'jewelryProduct',
  title: 'Luxury Jewelry Item',
  type: 'document',
  fields: [
    {
      name: 'itemName',
      title: 'Product Title',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Retail Price (USD)',
      type: 'number',
    },
    {
      name: 'productImage',
      title: 'High-Resolution Image Asset',
      type: 'image',
      options: {
        hotspot: true // Hotspot allows Soso to crop photos visually inside her dashboard
      }
    },
    {
      name: 'description',
      title: 'Editorial Product Description',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Necklaces', value: 'necklaces' },
          { title: 'Bracelets', value: 'bracelets' },
          { title: 'Fine Jewelry', value: 'fine-jewelry' },
          { title: 'Rings', value: 'rings' }
        ]
      }
    },
    {
      name: 'tags',
      title: 'Product Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'finishes',
      title: 'Available Finishes',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
}
