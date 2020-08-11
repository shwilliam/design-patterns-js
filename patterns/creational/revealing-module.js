/*
 * Revealing module
 * =========
 */

const revealingModule = (() => {
  let privateProperty = 0

  return {
    publicProperty: 42,
    publicMethod() {
      console.log('boop: ', privateProperty++)
    },
  }
})()
