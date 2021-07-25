const { statement, htmlStatement } = require('./statement');

const { invoices, plays } = require('./data');

(() => {
  console.log(statement(invoices[0], plays));
  console.log(htmlStatement(invoices[0], plays));
})();
