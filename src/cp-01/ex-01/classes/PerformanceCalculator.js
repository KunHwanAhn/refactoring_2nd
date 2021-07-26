const { TRAGEDY, COMEDY } = require('../constants');

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    switch (this.play.type) {
      case TRAGEDY: // 비극
      case COMEDY: // 희극
        throw new Error('서브클래스에서 처리하도록 설계되었습니다.');

      default:
        throw new Error(`알 수 없는 장르: ${this.play.type}`);
    }
  }

  get volumeCredits() {
    // 포인트를 적립한다.
    return Math.max(this.performance.audience - 30, 0);
  }
}

module.exports = PerformanceCalculator;
