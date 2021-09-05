const _ = require('lodash');

function acquireReading() {
  return {
    costomer: 'ivan',
    quantity: 10,
    month: 5,
    year: 2017,
  };
}

function calculateBaseCharge(aReading) {
  // eslint-disable-next-line no-undef
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

function enrichReading(original) {
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(result);
  // eslint-disable-next-line no-undef
  result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));

  return result;
}

const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
// eslint-disable-next-line no-unused-vars
const { baseCharge, taxableCharge } = aReading;
