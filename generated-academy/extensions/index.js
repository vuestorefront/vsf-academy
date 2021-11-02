const taxCategoryExtension = require('./taxCategoryExtension')

module.exports = (existing) => [
  ...existing,
  '@vsf-enterprise/commercetools/extensions',
  taxCategoryExtension,
]
