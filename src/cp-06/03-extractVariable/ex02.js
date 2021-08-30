// BEFORE
// class Order {
//   constructor(aRecord) {
//     this.data = aRecord;
//   }

//   get quantity() { return this.data.quantity; }

//   get itemPrice() { return this.data.itemPrice; }

//   get price() {
//     return this.quantity * this.itemPrice
//       - Math.max(0, this.quantity - 500) * this.itemPrice * 0.05
//         + Math.min(this.quantity * this.itemPrice * 0.1, 100);
//   }
// }

// AFTER
class Order {
  constructor(aRecord) {
    this.data = aRecord;
  }

  get quantity() { return this.data.quantity; }

  get itemPrice() { return this.data.itemPrice; }

  get price() { return this.basePrice - this.quantityDiscount + this.shipping; }

  get basePrice() { return this.quantity * this.itemPrice; }

  get quantityDiscount() { return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05; }

  get shipping() { return Math.min(this.basePrice * 0.1, 100); }
}

module.exports = Order;
