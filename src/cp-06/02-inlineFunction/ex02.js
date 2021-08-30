// BEFORE
// function gatherCustomerData(out, aCustomer) {
//   out.push(['name', aCustomer.name]);
//   out.push(['location', aCustomer.location]);
// }

// // eslint-disable-next-line no-unused-vars
// function reportLines(aCustomer) {
//   const lines = [];

//   gatherCustomerData(lines, aCustomer);
//   return lines;
// }

// AFTER
// eslint-disable-next-line no-unused-vars
function reportLines(aCustomer) {
  const lines = [];

  lines.push(['name', aCustomer.name]);
  lines.push(['location', aCustomer.location]);

  return lines;
}
