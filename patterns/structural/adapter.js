/*
 * Adapter Pattern
 * ===============
 *
 * Translates an interface for an object into one that is compatible with a
 * specific system
 *
 */

class Person {
  speak() {
    console.log('boop')
  }
}

class Cat {
  meow() {
    console.log('meow')
  }
}

class SpeakingCatAdapter {
  constructor(cat) {
    this.cat = cat
  }

  speak() {
    this.cat.meow()
  }
}

const person = new Person()
const cat = new SpeakingCatAdapter(new Cat())

;[person, cat].forEach(speaker => speaker.speak())
