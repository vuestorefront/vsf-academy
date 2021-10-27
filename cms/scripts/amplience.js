const cmsConfigs = require('../../config/cms/index')
const fs = require('fs').promises
const dc = require('dc-management-sdk-js')
const schemaUrl = 'cms/schema/amplience.json'
const helpers = require('../helpers.js')

return (async () => {
  const { logger } = helpers
  const { clientId: client_id, secret: client_secret, hubId } = cmsConfigs.amplience
  const client = new dc.DynamicContent({
    client_id,
    client_secret,
  })

  const hub = await client.hubs.get(hubId)

  const getContentRepository = async () => {
    const repositoryList = await hub.related.contentRepositories.list()
    const contentRepository = repositoryList._embedded['content-repositories'].find((item) => item.type === 'CONTENT')
    return client.contentRepositories.get(contentRepository.id)
  }
  const getContentTypes = () => {
    hub.related.contentTypeSchema
      .list()
      .then(async (response) => {
        const data = response._embedded['content-type-schemas'].map(({ body, schemaId, validationLevel }) => ({
          schemaId,
          body,
          validationLevel,
          label: JSON.parse(body).title,
        }))
        return fs.writeFile(schemaUrl, JSON.stringify(data))
      })
      .then(() => {
        console.log(`vsf-tu: amplience schema copy success. Saved in ${schemaUrl}`)
      })
      .catch(({ response }) => {
        logger({
          response,
          status: response.status,
          message: response.data.errors.map((e) => e.message).join(', '),
          name: cmsConfigs.amplience.name,
          debug: cmsConfigs.amplience.debug,
        })
      })
  }
  const uploadContentType = async () => {
    const schema = await fs.readFile(schemaUrl, 'utf8')
    const contentTypes = JSON.parse(schema)
    const contentRepository = await getContentRepository()
    for (item of contentTypes) {
      const { body, schemaId, validationLevel, label } = item
      const contentTypeSchema = new dc.ContentTypeSchema()
      contentTypeSchema.body = body
      contentTypeSchema.schemaId = schemaId
      contentTypeSchema.validationLevel = validationLevel
      await hub.related.contentTypeSchema
        .create(contentTypeSchema)
        .then(() => {
          const contentType = new dc.ContentType({
            contentTypeUri: schemaId,
            settings: {
              label,
            },
          })
          return hub.related.contentTypes.register(contentType)
        })
        .then(({ id }) => {
          return contentRepository.related.contentTypes.assign(id)
        })
        .then(() => {
          console.log(`vsf-tu: amplience component uploaded successfully: ${label}`)
        })
        .catch(({ response }) => {
          if (!response) return
          logger({
            response,
            status: response.status,
            message: response.data.errors.map((e) => e.message).join(', '),
            name: cmsConfigs.amplience.name,
            debug: cmsConfigs.amplience.debug,
          })
        })
    }
  }
  process.argv.includes('--update:schema') ? await getContentTypes() : await uploadContentType()
})()
