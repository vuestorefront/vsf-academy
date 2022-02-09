const commercetools = {
  name: 'commercetools',
  source: '@vsf-enterprise/commercetools',
  dependencies: { '@vsf-enterprise/commercetools': '~1.3.0', '@vue-storefront/commercetools': '~1.3.3' },
  resolutions: {'@vue-storefront/commercetools': '~1.3.3', '@vue-storefront/commercetools-api': '~1.3.3'},
  api: {
    uri: process.env.COMMERCETOOLS_URI,
    authHost: process.env.COMMERCETOOLS_AUTH_HOST,
    projectKey: process.env.COMMERCETOOLS_PROJECT_KEY,
    clientId: process.env.COMMERCETOOLS_CLIENT_ID,
    clientSecret: process.env.COMMERCETOOLS_CLIENT_SECRET,
    scopes: [
      `view_categories:${process.env.COMMERCETOOLS_PROJECT_KEY}`,
      `manage_my_profile:${process.env.COMMERCETOOLS_PROJECT_KEY}`,
      `manage_my_orders:${process.env.COMMERCETOOLS_PROJECT_KEY}`,
      `view_products:${process.env.COMMERCETOOLS_PROJECT_KEY}`,
      `view_published_products:${process.env.COMMERCETOOLS_PROJECT_KEY}`,
      `create_anonymous_token:${process.env.COMMERCETOOLS_PROJECT_KEY}`,
      `manage_my_payments:${process.env.COMMERCETOOLS_PROJECT_KEY}`,
      `manage_my_shopping_lists:${process.env.COMMERCETOOLS_PROJECT_KEY}`,
      `view_stores:${process.env.COMMERCETOOLS_PROJECT_KEY}`,
    ],
  },
  faceting: {
    host: process.env.COMMERCETOOLS_FACETING_URI,
  },
  currency: 'USD',
  country: 'US',
  languageMap: {
    'en': ['en', 'de'],
    'de': ['de', 'en']
  }
}

const shopify = {
  name: 'shopify',
  source: '@vue-storefront/shopify',
  dependencies: { 'isomorphic-fetch': '^2.2.1', '@vue-storefront/shopify': '1.0.1' },
  api: {
    domain: process.env.SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.SHOPIFY_TOKEN,
  },
  currency: process.env.SHOPIFY_CURRENCY,
  country: process.env.SHOPIFY_COUNTRY,
}

module.exports = {
  commercetools,
  shopify,
}
