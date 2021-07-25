const { statement, htmlStatement } = require('./statement');

const invoices = require('./invoices.json');
const plays = require('./plays.json');

(() => {
  console.log(statement(invoices[0], plays));
  console.log(htmlStatement(invoices[0], plays));
})();
