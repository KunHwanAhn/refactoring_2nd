const PerformanceCalculator = require('./PerformanceCalculator');

class ComdeyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;

    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }

    result += 300 * this.performance.audience;

    return result;
  }

  get volumeCredits() {
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

module.exports = ComdeyCalculator;
