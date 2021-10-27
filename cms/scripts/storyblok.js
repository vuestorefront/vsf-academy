const cmsConfigs = require('../../config/cms/index')
const helpers = require('../helpers.js')

const StoryblokClient = require('storyblok-js-client')

return (async () => {
  console.log('vsf-tu: building storyblok space ...')
  const { logger } = helpers
  const { token: oauthToken } = cmsConfigs.storyblok
  if (!oauthToken || oauthToken === 'YOUR_OAUTH_TOKEN') {
    return console.error('vsf-tu: storyblok space copy error [Token is missing, provide oauthToken]')
  }
  const Storyblok = new StoryblokClient({
    oauthToken,
  })
  const {
    data: { spaces },
  } = await Storyblok.get('spaces/', {})
  if (spaces.find((space) => space.name === 'new-project-space'))
    console.log('vsf-tu: this storyblok space already exists')
  return Storyblok.post('spaces/', {
    dup_id: '106306',
    space: {
      name: 'new-project-space',
    },
  })
    .then(() => console.log('vsf-tu: storyblok space copy success'))
    .catch(
      ({
        response,
        response: {
          data: { error: message, status },
        },
      }) => {
        if (response) {
          logger({
            response,
            status,
            message,
            name: cmsConfigs.storyblok.name,
            debug: cmsConfigs.storyblok.debug,
          })
        }
      },
    )
})()
