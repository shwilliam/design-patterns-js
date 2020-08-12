/*
 * Facade Pattern
 * ==============
 *
 * A higher-level interface that makes a subsystem easier to use
 *
 */

const addEvent = (el, ev, fn) => {
  if (el.addEventListener) {
    el.addEventListener(ev, fn, false)
  } else if (el.attachEvent) {
    el.attachEvent(`on${ev}`, fn)
  } else {
    el[`on${ev}`] = fn
  }
}
