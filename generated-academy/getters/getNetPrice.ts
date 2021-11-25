
const getNetPrice = (product): number | null => {
  const { priceNet } = product._original;

  return priceNet ? priceNet.value.centAmount / 100 : null;
};

export default getNetPrice;
