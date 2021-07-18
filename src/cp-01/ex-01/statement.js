function statement(invoice, plays) {
  function playFor(aPerformance) {
    return plays[aPerformance.playId];
  }

  function amountFor(aPerformance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
      case 'tragedy': // 비극
        result = 40000;

        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }

        break;

      case 'comedy': // 희극
        result = 30000;

        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }

        result += 300 * aPerformance.audience;

        break;

      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }

    return result;
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;

    // 포인트를 적립한다.
    result += Math.max(aPerformance.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if (playFor(aPerformance).type === 'comedy') {
      result += Math.floor(aPerformance.audience / 5);
    }

    return result;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function totalVolumeCredits() {
    let volumeCredits = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const perf of invoice.performances) {
    // 포인트를 적립한다.
      volumeCredits += volumeCreditsFor(perf);
    }

    return volumeCredits;
  }

  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  let totalAmount = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const perf of invoice.performances) {
    // const play = playFor(perf); // TODO: 여기서 변수 인라인 하는데... 적절한가?
    // const thisAmount = amountFor(perf);  // TODO: 여기서도 계산 하는 값을 재사용 안하고, 매번 계산하는 방향으로 변경함.

    // 청구 내역을 출력한다.
    result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }

  result += `총액 ${usd(totalAmount)}\n`;
  // TODO: 반복문 쪼개기 & 함수 추출하기로 분리했는데, 반복문을 쪼갰지만 시간 복잡도는 여전히 O(N)이라서 성능적으로는 문제 없어보이나 어색..
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;

  return result;
}

module.exports = statement;
