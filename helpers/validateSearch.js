const getMissingEnvVariables = require('./getMissingEnvVariables')

const validate = {
  algolia: () => {
    return {
      missingEnvVariables: getMissingEnvVariables(['ALGOLIA_APP_ID', 'ALGOLIA_ADMIN_API_KEY']),
    }
  },
}

module.exports = (search) => validate[search]()
