/*
 * Decorator Pattern
 * =================
 *
 * A way to extend responsibilities of an object dynamically
 *
 */

class Person {
  constructor({name = 'anon'}) {
    this.name = name
  }

  sayName() {
    console.log(this.name)
  }
}

class PersonDecorator {
  constructor(person) {
    this.person = person
  }

  sayName() {
    this.person.sayName()
  }
}

class StutterDecorator extends PersonDecorator {
  constructor(person) {
    super(person)
  }

  sayName() {
    super.sayName()
    super.sayName()
  }
}

const jane = new Person({name: 'Jane Doe'})
const janeWithStutter = new StutterDecorator(jane)
janeWithStutter.sayName()
