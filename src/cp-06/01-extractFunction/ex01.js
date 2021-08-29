/* eslint-disable no-unused-vars */
function printBanner() {}

function calculateOutstanding() {}

// BEFORE
// function printOwing(invoice) {
//   printBanner();
//   const outstanding = calculateOutstanding();

//   // 세부사항 출력
//   console.log(`고객명: ${invoice.customer}`);
//   console.log(`채무액: ${outstanding}`);
// }

// AFTER
function printOwing(invoice) {
  function printDetails(_outstanding) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${_outstanding}`);
  }

  printBanner();
  const outstanding = calculateOutstanding();

  printDetails(outstanding);
}
