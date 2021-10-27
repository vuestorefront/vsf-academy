const contentfulManagement = require('contentful-management')
const cmsConfigs = require('../../config/cms/index')
const helpers = require('../helpers.js')
const fs = require('fs').promises

const formatData = (item) => ({
  id: item.sys.id,
  data: {
    name: item.name,
    fields: item.fields,
  },
})

return (async () => {
  console.log('vsf-tu: building contentful space ...')
  const {
    token: accessToken,
    environment: environmentId,
    middlewareConfig: { space: spaceId },
  } = cmsConfigs.contentful
  const { logger } = helpers
  const schemaUrl = 'cms/schema/contentful.json'
  if (!spaceId || !accessToken || !environmentId) {
    return console.error('vsf-tu: contentful schema copy error [Provide correct credentials]')
  }
  const { getSpace } = contentfulManagement.createClient({
    accessToken,
  })
  const space = await getSpace(spaceId)
  const environment = await space.getEnvironment(environmentId)
  const getSchema = () => {
    environment
      .getContentTypes()
      .then(async (response) => {
        const data = response.items.map(formatData)
        await fs.writeFile(schemaUrl, JSON.stringify(data))
        console.log(`vsf-tu: contentful schema copy success, saved in ${schemaUrl}`)
      })
      .catch(({ message }) => {
        const error = JSON.parse(message)
        logger({
          response: error.details,
          status: error.status,
          message: error.message,
          name: cmsConfigs.contentful.name,
          debug: cmsConfigs.contentful.debug,
        })
      })
  }
  const uploadSchema = async () => {
    const schema = await fs.readFile(schemaUrl, 'utf8')
    const contentTypes = JSON.parse(schema)
    for (item of contentTypes) {
      const { id, data } = item
      await environment
        .createContentTypeWithId(id, data)
        .then((contentType) => contentType.publish())
        .then(() => {
          console.log(`vsf-tu: contentful component uploaded successfully [${data.name}]`)
        })
        .catch(({ message }) => {
          const error = JSON.parse(message)
          logger({
            response: error.details,
            status: error.status,
            message: error.message,
            name: cmsConfigs.contentful.name,
            debug: cmsConfigs.contentful.debug,
          })
        })
    }
  }
  process.argv.includes('--update:schema') ? await getSchema() : await uploadSchema()
})()
