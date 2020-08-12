/*
 * Template Method Pattern
 * =======================
 *
 * Defines a skeleton of an algorithm in a method to be redefined by subclasses
 *
 */

class Sandwich {
  prepareBottom() {
    console.log('bottom slice')
  }

  prepareContents() {}

  prepareTop() {
    console.log('top slice')
  }

  prepare() {
    this.prepareBottom()
    this.prepareContents()
    this.prepareTop()
  }
}

class CheeseSandwich extends Sandwich {
  prepareContents() {
    console.log('butter')
    console.log('cheese')
  }
}

const mySandwich = new CheeseSandwich()

mySandwich.prepare()
