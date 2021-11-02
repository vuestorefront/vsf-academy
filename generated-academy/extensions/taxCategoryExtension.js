const getTaxValue = (rates, configurationCountry) => {
  return rates
    .filter(({ includedInPrice, country }) => includedInPrice && country === configurationCountry)
    .reduce((acc, { amount }) => Number((acc + amount).toFixed(2)), 0);
};

const getNetPrice = (grossPrice, taxValue) => {
  return Math.round(grossPrice * (1 - taxValue));
};

module.exports = {
  name: 'taxCategoryExtension',
  hooks: () => ({
    beforeCreate: ({ configuration }) => configuration,
    afterCreate: ({ configuration }) => configuration,
    beforeCall: ({ configuration, callName, args }) => args,
    afterCall: ({ configuration, callName, args, response }) => {
      if (callName === 'getProduct' && response?.data?.products) {
        const { country } = configuration;

        response.data.products.results.map((product) => {
          if ('taxCategory' in product) {
            const { value, discounted } = product.masterData.current.masterVariant.price;

            const taxValue = getTaxValue(product.taxCategory.rates, country);
            const netPrice = getNetPrice(value.centAmount, taxValue);

            product.priceNet = {
              discounted,
              value: {
                ...value,
                centAmount: netPrice
              }
            };
          }
          return product;
        });
      }
      return response;
    }
  })
};
