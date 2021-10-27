const getMissingEnvVariables = require('./getMissingEnvVariables')

const validate = {
  amplience: (validateManagement) => {
    return {
      missingEnvVariables: getMissingEnvVariables(
        [
          validateManagement && 'AMPLIENCE_MANAGEMNT_TOKEN',
          'AMPLIENCE_CLIENT_ID',
          'AMPLIENCE_SECRET',
          'AMPLIENCE_HUB_ID',
          'AMPLIENCE_URL',
        ].filter(Boolean),
      ),
    }
  },
  contentful: (validateManagement) => {
    return {
      missingEnvVariables: getMissingEnvVariables(
        [validateManagement && 'CONTENTFUL_MANAGEMENT_TOKEN', 'CONTENTFUL_TOKEN', 'CONTENTFUL_SPACE'].filter(Boolean),
      ),
    }
  },
  contentstack: (validateManagement) => {
    return {
      missingEnvVariables: getMissingEnvVariables(
        [
          validateManagement && 'CONTENTSTACK_MANAGEMENT_TOKEN',
          validateManagement && 'CONTENTSTACK_MANAGEMENT_URL',
          'CONTENTSTACK_KEY',
          'CONTENTSTACK_TOKEN',
          'CONTENTSTACK_ENV',
          'CONTENTSTACK_REGION',
        ].filter(Boolean),
      ),
    }
  },
  storyblok: (validateManagement) => {
    return {
      missingEnvVariables: getMissingEnvVariables(
        [validateManagement && 'STORYBLOK_MANAGEMENT_TOKEN', 'STORYBLOK_TOKEN', 'STORYBLOK_CACHE_PROVIDER'].filter(
          Boolean,
        ),
      ),
    }
  },
}

module.exports = (cms, validateManagement = false) => validate[cms](validateManagement)
