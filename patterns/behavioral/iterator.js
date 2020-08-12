/*
 * Iterator
 * ========
 *
 * Provides a way to access elements of an aggregate object sequentially
 * without exposing its underlying representation
 *
 */

const myIterator = {
  *[Symbol.iterator]() {
    yield 'boop'
    yield 42
    yield Math.PI
  },
}

for (let thing of myIterator) {
  console.log(thing)
}

console.log([...myIterator])
