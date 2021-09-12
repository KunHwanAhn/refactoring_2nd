class NumberRange {
  constructor(min, max) {
    this.data = { min, max };
  }

  get min() { return this.data.min; }

  get max() { return this.data.max; }

  /**
   *
   * @param {number} arg
   */
  contains(arg) {
    return arg >= this.min && arg <= this.max;
  }
}

const station = {
  name: 'ZB1',
  readings: [
    { temp: 47, time: '2016-11-10 09:10' },
    { temp: 53, time: '2016-11-10 09:20' },
    { temp: 58, time: '2016-11-10 09:30' },
    { temp: 53, time: '2016-11-10 09:40' },
    { temp: 51, time: '2016-11-10 09:50' },
  ],
};

/**
 *
 * @param {object} _station
 * @param {string} _station.name
 * @param {object[]} _station.readings
 * @param {number} _station.readings.temp
 * @param {string} _station.readings.time
 * @param {NumberRange} range
 * @returns
 */
function readingsOutsideRange(_station, range) {
  return _station.readings.filter(((r) => !range.contains(r.temp)));
}

const operatingPlan = {
  temperatureFloor: 42,
  temperatureCeiling: 58,
};

const range = new NumberRange(
  operatingPlan.temperatureFloor, // 최저 온도
  operatingPlan.temperatureCeiling, // 최고 온도)
);

readingsOutsideRange(station, range);
