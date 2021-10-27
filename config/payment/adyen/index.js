const nuxtConfig = {
  availablePaymentMethods: ['scheme', 'paypal'],
  clientKey: 'test_CPVKSXX5YRHJRATKZ7CRY7XCJEGJN33J',
  environment: 'test',
  methods: {
    paypal: {
      merchantId: 'KWB8VZBUR598L',
      intent: 'authorize',
    },
  },
}

const middlewareConfig = {
  ctApi: {
    apiHost: 'https://api.europe-west1.gcp.commercetools.com',
    authHost: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: 'vsf-generic-ent-demo',
    clientId: 'fHcfVNyFqHNNhJOj70e4lJtm',
    clientSecret: 'Adqiw8-UkbADtLQjRZ49WreNe3N1AMK6',
    scopes: ['manage_project:vsf-generic-ent-demo'],
  },
  adyenMerchantAccount: 'VSFAccount243ECOM',
  origin: 'https://demo-ee.vuestorefront.io',
  buildRedirectUrlAfter3ds1Auth: (paymentAndOrder) => `/checkout/thank-you?order=${paymentAndOrder.order.id}`,
  buildRedirectUrlAfter3ds1Error: (err) => '/?3ds1-server-error',
}

module.exports = {
  tag: 'adyen',
  source: '@vsf-enterprise/adyen',
  makesOrder: true,
  nuxtConfig,
  middlewareConfig,
  dependencies: { '@vsf-enterprise/adyen': '^1.0.0' },
}
