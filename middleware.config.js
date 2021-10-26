module.exports = {
  integrations: {
    ct: {
      location: "@vue-storefront/commercetools-api/server",
      extensions: existing =>
        existing.concat("@vsf-enterprise/commercetools/extensions"),
      configuration: {
        api: {
          uri: "https://api.commercetools.com/vsf-ct-dev/graphql",
          authHost: "https://auth.sphere.io",
          projectKey: "vsf-ct-dev",
          clientId: "kuFT95wdTP4uH_hVOKjqfGEo",
          clientSecret: "tklIDic86mgWrFy0oBHRQQmwX7ZC5wIP",
          scopes: ["manage_project:vsf-ct-dev"]
        },
        currency: "USD",
        country: "US"
      },
      customQueries: {
        LastModifiedProductsQuery: ({ query, variables, metadata }) => {
          variables.where = `lastModifiedAt <= "${metadata.date}"`;
          variables.limit = metadata.limit;
          variables.sort = `lastModifiedAt ${metadata.order}`;
          return { query, variables };
        }
      }
    },
    ctf: {
      location: "@vsf-enterprise/ct-faceting/server",
      configuration: {
        api: {
          authHost: "https://auth.sphere.io",
          projectKey: "vsf-ct-dev",
          clientId: "kuFT95wdTP4uH_hVOKjqfGEo",
          clientSecret: "tklIDic86mgWrFy0oBHRQQmwX7ZC5wIP",
          scopes: ["manage_project:vsf-ct-dev"]
        },
        faceting: {
          host: "https://api.commercetools.com"
        }
      }
    },
  }
};
