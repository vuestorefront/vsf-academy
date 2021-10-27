module.exports = {
  integrations: {
    <%_ if (options.commerce.name === 'commercetools') { _%>
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      extensions: existing => existing.concat('@vsf-enterprise/commercetools/extensions'),
      configuration: {
        api: JSON.parse('<%- JSON.stringify(options.commerce.api) %>'),
        currency: '<%= options.commerce.currency %>',
        country: '<%= options.commerce.country %>'
      },
      customQueries: {
        "LastModifiedProductsQuery": ({ query, variables, metadata }) => {
          variables.where = `lastModifiedAt <= "${metadata.date}"`;
          variables.limit = metadata.limit;
          variables.sort = `lastModifiedAt ${metadata.order}`;
          return { query, variables };
        }
      }
    },
    ctf: {
      location: '@vsf-enterprise/ct-faceting/server',
      configuration: {
        api: JSON.parse('<%- JSON.stringify(options.commerce.api) %>'),
        faceting: {
          host: '<%= options.commerce.faceting.host %>'
        },
      }
    },
    <%_ } _%>
    <%_ if (options.commerce.name === 'shopify') { _%>
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        api: JSON.parse('<%- JSON.stringify(options.commerce.api) %>'),
        currency: '<%= options.commerce.currency %>',
        country: '<%= options.commerce.country %>'
      }
    },
    <%_ } _%>
    <%_ if (options.payment) { _%>
    '<%= options.payment.tag %>': {
      location: '<%= options.payment.source %>/server',
      configuration: {
        ...JSON.parse('<%- JSON.stringify(options.payment.middlewareConfig) %>'),
        buildRedirectUrlAfter3ds1Auth: <%- options.payment.middlewareConfig.buildRedirectUrlAfter3ds1Auth %>,
        buildRedirectUrlAfter3ds1Error: <%- options.payment.middlewareConfig.buildRedirectUrlAfter3ds1Error %>
      }
    },
    <%_ } _%>
    <%_ if (options.search) { _%>
    '<%= options.search.tag %>': {
      ...JSON.parse('<%- JSON.stringify(options.search.middlewareConfig) %>')
    },
    <%_ } _%>
    <%_ if (options.cms) { _%>
    '<%= options.cms.tag %>': {
      location: '<%= options.cms.source %>/server',
      configuration: {
        ...JSON.parse('<%- JSON.stringify(options.cms.middlewareConfig) %>')
      }
    },
    <%_ } _%>
  }
};
