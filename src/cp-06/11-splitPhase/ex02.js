function calculatePriceingData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount = Math.max(quantity - product.discountThreshold, 0)
   * product.basePrice
   * product.discountRate;

  return { basePrice, quantity, discount };
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase = priceData.basePrice > shippingMethod.discountThreshold
    ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  const price = priceData.basePrice - priceData.discount + shippingCost;

  return price;
}

function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePriceingData(product, quantity);
  return applyShipping(priceData, shippingMethod);
}

module.exports = priceOrder;
