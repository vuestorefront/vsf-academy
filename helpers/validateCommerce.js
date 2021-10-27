const getMissingEnvVariables = require('./getMissingEnvVariables')

const validate = {
  shopify: () => {
    return {
      missingEnvVariables: getMissingEnvVariables([
        'SHOPIFY_DOMAIN',
        'SHOPIFY_TOKEN',
        'SHOPIFY_CURRENCY',
        'SHOPIFY_COUNTRY',
      ]),
    }
  },
  commercetools: () => {
    return {
      missingEnvVariables: getMissingEnvVariables([
        'COMMERCETOOLS_URI',
        'COMMERCETOOLS_FACETING_URI',
        'COMMERCETOOLS_AUTH_HOST',
        'COMMERCETOOLS_PROJECT_KEY',
        'COMMERCETOOLS_CLIENT_ID',
        'COMMERCETOOLS_CLIENT_SECRET',
        'COMMERCETOOLS_COUNTRY',
        'COMMERCETOOLS_CURRENCY',
      ]),
    }
  },
}

module.exports = (commerce) => validate[commerce]()
