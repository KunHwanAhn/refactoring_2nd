// BEFORE
// const orderData = orderString.split(/\s+/);
// const productPrice = priceList[orderData[0].split('-')[1]];
// const orderPrice = parseInt(orderData[1], 10) * productPrice;

const order = {};
const priceList = {};

function parseOrder(aString) {
  const values = aString.split(/\s+/);

  return {
    productId: values[0].split('-')[1],
    quantity: parseInt(values[1], 10),
  };
}

function price(_order, _priceList) {
  return _order.quantity * _priceList[_order.productId];
}

const orderRecord = parseOrder(order);
// eslint-disable-next-line no-unused-vars
const orderPrice = price(orderRecord, priceList);
