/*
 * Proxy Pattern
 * =============
 *
 * The use of a placeholder for another object to control acces to it
 *
 */

const aboveZeroValidator = {
  set(obj, prop, value) {
    if (typeof value !== 'number' || Number.isNaN(value) || value < 0)
      throw new Error(`${prop} must be above 0`)

    obj[prop] = value
    return true
  },
}

const positiveValuesProxy = new Proxy({}, aboveZeroValidator)

positiveValuesProxy.a = 1
positiveValuesProxy.b = 20
