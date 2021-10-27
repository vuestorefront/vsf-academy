module.exports = {
  tag: 'algolia',
  clientSource: '@vsf-enterprise/algolia',
  serverSource: '@vsf-enterprise/algolia-api',
  dependencies: { '@vsf-enterprise/algolia': '^1.0.0', '@vsf-enterprise/algolia-api': '^1.0.0' },
  nuxtConfig: {
    attributesForFilters: [
      'hierarchicalCategories.en.lvl0',
      'hierarchicalCategories.de.lvl0',
      'hierarchicalCategories.en.lvl1',
      'hierarchicalCategories.de.lvl1',
      'hierarchicalCategories.en.lvl2',
      'hierarchicalCategories.de.lvl2',
      'color',
      'commonSize',
    ],
  },
  middlewareConfig: {
    location: '@vsf-enterprise/algolia-api/server',
    configuration: {
      appId: process.env.ALGOLIA_APP_ID,
      defaultLocale: 'en',
      adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
      entities: {
        product: {
          'name:asc': {
            index: 'products',
            index_en: 'products_name_asc_en',
            index_de: 'products_name_asc_de',
            label: 'Name A-Z',
            default: true,
          },
          'name:desc': {
            label: 'Name Z-A',
            index: 'products',
            index_en: 'products_name_desc_en',
            index_de: 'products_name_desc_de',
          },
          'price:asc': {
            label: 'Price Min-Max',
            index: 'products_price_asc',
          },
          'price:desc': {
            label: 'Price Max-Min',
            index: 'products_price_desc',
          },
        },
        category: {
          name: {
            index: 'categories',
            default: true,
          },
        },
      },
      adapters: ['commercetools'],
      attributesForFilters: ['color', 'commonSize'],
      disjunctiveFacets: ['color', 'commonSize', 'categories.en.slug', 'categories.de.slug'],
    },
  },
}
