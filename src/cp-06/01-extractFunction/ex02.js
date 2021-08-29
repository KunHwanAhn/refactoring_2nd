/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// NOTE: 유효범위를 벗어나는 변수가 없을 때

function printBanner() {
  console.log('***************');
  console.log('**** 고객 채무 ****');
  console.log('***************');
}

function printOwing(invoice) {
  let outstanding = 0;

  function printDetails() {
    // 세부 사항을 출력한다.
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocalDateString()}`);
  }

  printBanner();

  // 미해결 채무(outstanding)를 계산한다.
  // eslint-disable-next-line no-restricted-syntax
  for (const o of invoice.orders) {
    outstanding = o.amount;
  }

  // eslint-disable-next-line prefer-destructuring
  const today = Clock.today;
  // eslint-disable-next-line no-param-reassign
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  printDetails();
}
