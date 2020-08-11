/*
 * Strategy Pattern
 * ================
 *
 * A family of interchangeable algorithms that can vary independently from
 * the clients that use them
 *
 */

class StrategyA {
  doThing() {
    console.log('a')
  }
}

class StrategyB {
  doThing() {
    console.log('b')
  }
}

class StrategyManager {
  constructor({strategy = null}) {
    this._strategy = strategy
  }

  set strategy(strategy) {
    this._strategy = strategy
  }

  get strategy() {
    return this._strategy
  }

  doThing() {
    this._strategy.doThing()
  }
}

const stratA = new StrategyA()
const stratB = new StrategyB()
const stratManager = new StrategyManager({strategy: stratA})
stratManager.doThing() // a
stratManager.strategy = stratB
stratManager.doThing() // b
