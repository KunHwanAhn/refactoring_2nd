const { TRAGEDY, COMEDY } = require('./constants');
const { TragedyCalculator, ComdeyCalculator } = require('./classes');

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
