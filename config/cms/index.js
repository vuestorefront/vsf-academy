const amplience = {
  tag: 'ampl',
  path: 'cms',
  name: 'amplience',
  source: '@vsf-enterprise/amplience',
  dependencies: { '@vsf-enterprise/amplience': '^0.3.0' },
  token: process.env.AMPLIENCE_MANAGEMNT_TOKEN,
  clientId: process.env.AMPLIENCE_CLIENT_ID,
  secret: process.env.AMPLIENCE_SECRET,
  hubId: process.env.AMPLIENCE_HUB_ID,
  middlewareConfig: {
    url: process.env.AMPLIENCE_URL,
  },
  nodeConfig: {},
  debug: true,
}

const contentful = {
  tag: 'cntf',
  path: 'cms',
  name: 'contentful',
  source: '@vsf-enterprise/contentful',
  dependencies: { '@vsf-enterprise/contentful': '^0.3.0' },
  token: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  middlewareConfig: {
    token: process.env.CONTENTFUL_TOKEN,
    space: process.env.CONTENTFUL_SPACE,
  },
  nodeConfig: {
    type: 'page',
  },
  debug: true,
}

const contentstack = {
  tag: 'cnts',
  path: 'cms',
  name: 'contentstack',
  source: '@vsf-enterprise/contentstack',
  dependencies: { '@vsf-enterprise/contentstack': '^0.3.0' },
  token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
  api: process.env.CONTENTSTACK_MANAGEMENT_URL,
  middlewareConfig: {
    key: process.env.CONTENTSTACK_KEY,
    token: process.env.CONTENTSTACK_TOKEN,
    env: process.env.CONTENTSTACK_ENV,
    region: process.env.CONTENTSTACK_REGION,
  },
  nodeConfig: {},
  debug: true,
}

const storyblok = {
  tag: 'sb',
  path: 'cms',
  name: 'storyblok',
  source: '@vue-storefront/storyblok',
  dependencies: { '@vue-storefront/storyblok': '^0.3.0' },
  token: process.env.STORYBLOK_MANAGEMENT_TOKEN,
  middlewareConfig: {
    token: process.env.STORYBLOK_TOKEN,
    cacheProvider: process.env.STORYBLOK_CACHE_PROVIDER,
  },
  nodeConfig: {},
  debug: true,
}

module.exports = {
  amplience,
  contentful,
  contentstack,
  storyblok,
}
