class Reading {
  constructor(data) {
    this.customer = data.customer;
    this.quantity = data.quantity;
    this.month = data.month;
    this.year = data.year;
  }

  get customer() { return this.customer; }

  get quantity() { return this.quantity; }

  get month() { return this.month; }

  get year() { return this.year; }

  // eslint-disable-next-line no-undef
  get baseCharge() { return baseRate(this.month, this.year) * this.quantity; }

  // eslint-disable-next-line no-undef
  get taxableCharge() { return Math.max(0, this.baseCharge - taxThreshold(this.year)); }
}

function acquireReading() {
  return {
    costomer: 'ivan',
    quantity: 10,
    month: 5,
    year: 2017,
  };
}

const rawReading = acquireReading();
const aReading = new Reading(rawReading);
// eslint-disable-next-line no-unused-vars
const texableCharge = aReading.taxableCharge;
// eslint-disable-next-line no-unused-vars
const basicChargeAmount = aReading.baseCharge;
