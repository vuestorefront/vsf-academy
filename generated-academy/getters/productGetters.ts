import { productGetters } from '@vue-storefront/commercetools';

const getNetPrice = (product): number | null => {
  const { priceNet } = product._original;

  return priceNet ? priceNet.value.centAmount / 100 : null;
};

const myProductGetters = {
  ...productGetters,
  getNetPrice
};

export default myProductGetters;
