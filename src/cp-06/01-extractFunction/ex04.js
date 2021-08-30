/* eslint-disable no-unused-vars */
// NOTE: 지역 변수의 값을 변경할 때

function printBanner() {
  console.log('***************');
  console.log('**** 고객 채무 ****');
  console.log('***************');
}

function calculateOutstanding(invoice) {
  let result = 0;

  // 미해결 채무(outstanding)를 계산한다.
  // eslint-disable-next-line no-restricted-syntax
  for (const o of invoice.orders) {
    result = o.amount;
  }

  return result;
}

function recordDueDate(invoice) {
  /* eslint-disable */
  const today = Clock.today;
  /* eslint-enable */

  // eslint-disable-next-line no-param-reassign
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function printDetails(invoice, outstanding) {
  // 세부 사항을 출력한다.
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocalDateString()}`);
}

// eslint-disable-next-line no-unused-vars
function printOwing(invoice) {
  printBanner();

  const outstanding = calculateOutstanding(invoice);

  recordDueDate(invoice);

  printDetails(invoice, outstanding);
}
