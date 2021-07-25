/* eslint-disable max-classes-per-file */
const TRAGEDY = 'tragedy';
const COMEDY = 'comedy';

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

// TODO: ESLint에서는 1개의 파일에 1개의 클래스만 있도록 권장함.
class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;

    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }

    return result;
  }
}

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

function createPerformanceCaculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case TRAGEDY:
      return new TragedyCalculator(aPerformance, aPlay);

    case COMEDY:
      return new ComdeyCalculator(aPerformance, aPlay);

    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

function createStatementData(invoice, plays) {
  function playFor(aPerformance) {
    return plays[aPerformance.playId];
  }

  // TODO: 예제에서는 여기도 변환했지만 실제로 사용하는 곳이 없음.
  // function amountFor(aPerformance) {
  //   return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
  // }

  // function volumeCreditsFor(aPerformance) {
  //   return new PerformanceCalculator(aPerformance, playFor(aPerformance)).volumeCredits;
  // }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }

  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCaculator(aPerformance, playFor(aPerformance));

    // TODO: AirBnb ESLint 적용하니, Object.assign()을 스프레드 연산자로 바꿈, 원본은 Object.assign
    const result = { ...aPerformance };
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;

    return result;
  }

  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);

  return result;
}

module.exports = createStatementData;
