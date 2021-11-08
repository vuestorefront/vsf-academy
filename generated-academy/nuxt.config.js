import theme from './themeConfig';

import webpack from 'webpack';
import { VSF_LOCALE_COOKIE } from '@vue-storefront/core';

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap'
      }
    ],
    script: []
  },
  loading: { color: '#fff' },
  router: {
    middleware: ['checkout'],
    scrollBehavior (_to, _from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'brand-page',
        path: '/brand-page/:brand_name',
        component: resolve(__dirname, 'pages/Brand.vue')
      })
    }
  },
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa',
    ['@vue-storefront/nuxt-theme'],
    ['@vue-storefront/nuxt', {
      useRawSource: {
        dev: [
          '@vue-storefront/core',
        ],
        prod: [
          '@vue-storefront/core',
        ]
      }
    }],
    ['@vsf-enterprise/ct-faceting/nuxt', {
      apiConfigModule: '@vsf-enterprise/commercetools/nuxt',
      availableFacets: [
        { facet: 'categories.id', type: 'string', option: 'subtree("*")', name: 'category', filteringStrategy: 'query' },
        { facet: 'variants.attributes.size', type: 'string', option: '', name: 'size' },
        { facet: 'variants.attributes.color.key', type: 'string', option: '', name: 'color' },
        { facet: 'variants.price.centAmount', type: '', option: '', name: 'price' }
      ],
    }],
    ['@vsf-enterprise/commercetools/nuxt', {
      i18n: {
        useNuxtI18nConfig: true
      }
    }],
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@vue-storefront/middleware/nuxt',
    '~modules/extend-routes.ts'
  ],
  plugins: [],
  serverMiddleware: [],
  i18n: {
    currency: 'USD',
    country: 'US',
    countries: [
      { name: 'US', label: 'United States', states: ['California', 'Nevada'] },
      { name: 'AT', label: 'Austria' },
      { name: 'DE', label: 'Germany' },
      { name: 'NL', label: 'Netherlands' }
    ],
    currencies: [
      { name: 'EUR', label: 'Euro' },
      { name: 'USD', label: 'Dollar' }
    ],
    locales: [
      { code: 'en', label: 'English', file: 'en.js', iso: 'en' },
      { code: 'de', label: 'German', file: 'de.js', iso: 'de' }
    ],
    defaultLocale: 'en',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      numberFormats: {
        en: {
          currency: {
            style: 'currency', currency: 'USD', currencyDisplay: 'symbol'
          },
          currencyNoCents: {
            style: 'currency', currency: 'USD', currencyDisplay: 'symbol', minimumFractionDigits: 0,
          }
        },
        de: {
          currency: {
            style: 'currency', currency: 'EUR', currencyDisplay: 'symbol'
          },
          currencyNoCents: {
            style: 'currency', currency: 'EUR', currencyDisplay: 'symbol', minimumFractionDigits: 0,
          }
        }
      }
    },
    detectBrowserLanguage: {
      cookieKey: VSF_LOCALE_COOKIE
    }
  },
  styleResources: {
    scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] })]
  },
  publicRuntimeConfig: {
    theme
  },
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    },
    transpile: [
      'vee-validate/dist/rules'
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  }
};
