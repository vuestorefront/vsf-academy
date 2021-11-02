const productTaxCategory = require('./productTaxCategory')

module.exports = {
  productTaxCategory: ({ variables }) => {
    return { query: productTaxCategory, variables }
  },
  LastModifiedProductsQuery: ({ query, variables, metadata }) => {
    variables.where = `lastModifiedAt <= "${metadata.date}"`
    variables.limit = metadata.limit
    variables.sort = `lastModifiedAt ${metadata.order}`
    return { query, variables }
  },
}
