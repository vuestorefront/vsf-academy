const cmsConfigs = require('./config/cms')
const searchConfigs = require('./config/search')
const paymentConfigs = require('./config/payment')
const commerceConfigs = require('./config/commerce')

const getFlagValue = (flag) => {
  const flagIndex = process.argv.findIndex((argument) => argument === flag)
  return flagIndex > 0 ? process.argv[flagIndex + 1] : false
}

module.exports = (() => {
  const name = getFlagValue('--et:name')
  const output = getFlagValue('--et:output')
  const extension = getFlagValue('--et:extension')
  const cms = getFlagValue('--et:cms') && cmsConfigs[getFlagValue('--et:cms')]
  const search = getFlagValue('--et:search') && searchConfigs[getFlagValue('--et:search')]
  const payment = getFlagValue('--et:payment') && paymentConfigs[getFlagValue('--et:payment')]
  const commerce = getFlagValue('--et:commerce') && commerceConfigs[getFlagValue('--et:commerce')]

  return {
    copy: {
      // to: path.resolve(__dirname, `${output}/generated-${name}`),
      to: `generated-${name}`,
      from: [
        {
          path: './node_modules/@vue-storefront/nuxt-theme/theme',
          ignore: [],
          variables: {
            options: {
              generate: {
                replace: {
                  composables: commerce.source,
                },
              },
            },
          },
          watch: false,
        },
        ...(commerce.name === 'shopify'
          ? [
              {
                path: './node_modules/@vue-storefront/shopify-theme',
                ignore: [],
                variables: {},
                watch: false,
              },
            ]
          : []),
        ...(commerce.name === 'commercetools'
          ? [
              {
                path: './node_modules/@vue-storefront/commercetools-theme',
                ignore: [],
                variables: {},
                watch: false,
              },
              {
                path: './themes/commercetools',
                ignore: ['pages/ejs/**', 'components/ejs/**'],
                variables: {
                  options: {
                    generate: {
                      replace: {
                        composables: commerce.source,
                      },
                    },
                    payment,
                  },
                },
                watch: false,
              },
            ]
          : []),
        ...(extension === 'click-and-collect'
          ? [
              {
                path: './themes/click-and-collect',
                ignore: [],
                variables: {
                  options: {
                    generate: {
                      replace: {
                        composables: commerce.source,
                      },
                    },
                  },
                },
                watch: false,
              },
            ]
          : []),
        ...(search
          ? [
              {
                path: './themes/search',
                ignore: [],
                variables: {
                  options: {
                    generate: {
                      replace: {
                        composables: commerce.source,
                      },
                    },
                  },
                },
                watch: false,
              },
            ]
          : []),
        ...(cms
          ? [
              {
                path: './themes/cms',
                ignore: [
                  'components/cms/page/ejs/**',
                  'components/cms/layout/ejs/**',
                  'pages/ejs/**',
                  'layouts/ejs/**',
                ],
                variables: {
                  options: {
                    cms,
                  },
                },
                watch: false,
              },
              {
                path: './node_modules/@vsf-enterprise/cms-components',
                ignore: ['/components/cms/page/ProductSlider.vue', '*'],
                watch: false,
              },
            ]
          : []),
        {
          path: './themes/common',
          ignore: [],
          variables: {
            options: {
              cms,
              payment,
              search,
              commerce,
              name,
            },
          },
          watch: false,
        },
      ],
    },
    cms,
  }
})()
