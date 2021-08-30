// BEFORE
// function moreThanFiveLateDeliveires(driver) {
//   return driver.numberOfLateDeliveries > 5;
// }

// function getRating(driver) {
//   return moreThanFiveLateDeliveires(driver) ? 2 : 1;
// }

// AFTER
// eslint-disable-next-line no-unused-vars
function getRating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}
