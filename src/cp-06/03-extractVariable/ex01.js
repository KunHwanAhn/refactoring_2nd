// BEFORE
// function fooBar(order) {
//   return order.quantity * order.itemPrice
//   - Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
//     + Math.min(order.quantity * order.itemPrice * 0.1, 100);
// }

// AFTER
// eslint-disable-next-line no-unused-vars
function fooBar(order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(basePrice * 0.1, 100);

  return basePrice - quantityDiscount + shipping;
}
