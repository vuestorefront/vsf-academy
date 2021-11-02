const customQueries = require('./customQueries');
const extensions = require('./extensions');

module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: {
        api: JSON.parse('{"uri":"https://api.europe-west1.gcp.commercetools.com/vsf-generic-ent-demo/graphql","authHost":"https://auth.europe-west1.gcp.commercetools.com","projectKey":"vsf-generic-ent-demo","clientId":"RD8n_WKuvFNTflz6wx3eDoZ8","clientSecret":"urEdys9RWlc2PGZFasCELzs9C4RlADdn","scopes":["view_categories:vsf-generic-ent-demo","manage_my_profile:vsf-generic-ent-demo","manage_my_orders:vsf-generic-ent-demo","view_products:vsf-generic-ent-demo","view_published_products:vsf-generic-ent-demo","create_anonymous_token:vsf-generic-ent-demo","manage_my_payments:vsf-generic-ent-demo","manage_my_shopping_lists:vsf-generic-ent-demo","view_stores:vsf-generic-ent-demo"]}'),
        currency: 'USD',
        country: 'US'
      },
      extensions,
      customQueries
    },
    ctf: {
      location: '@vsf-enterprise/ct-faceting/server',
      configuration: {
        api: JSON.parse('{"uri":"https://api.europe-west1.gcp.commercetools.com/vsf-generic-ent-demo/graphql","authHost":"https://auth.europe-west1.gcp.commercetools.com","projectKey":"vsf-generic-ent-demo","clientId":"RD8n_WKuvFNTflz6wx3eDoZ8","clientSecret":"urEdys9RWlc2PGZFasCELzs9C4RlADdn","scopes":["view_categories:vsf-generic-ent-demo","manage_my_profile:vsf-generic-ent-demo","manage_my_orders:vsf-generic-ent-demo","view_products:vsf-generic-ent-demo","view_published_products:vsf-generic-ent-demo","create_anonymous_token:vsf-generic-ent-demo","manage_my_payments:vsf-generic-ent-demo","manage_my_shopping_lists:vsf-generic-ent-demo","view_stores:vsf-generic-ent-demo"]}'),
        faceting: {
          host: 'https://api.europe-west1.gcp.commercetools.com'
        },
      }
    },
  }
};
