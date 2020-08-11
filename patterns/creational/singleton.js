/*
 * Singleton
 * =========
 */

const singleton = (() => {
  let instance

  const init = () => {
    const privateProperty = 'secret'

    return {
      publicMethod: () => console.log('boop'),
    }
  }

  return {
    getInstance: () => {
      if (!instance) instance = init()
      return instance
    },
  }
})()
