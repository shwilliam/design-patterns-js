# Design Patterns in JS

> JavaScript variations of popular software design patterns

## Overview

- [Creational](#creational-patterns)
  - [Factory](#factory)
  - [Module](#module)
  - [Revealing module](#revealing-module)
- [Structural](#structural-patterns)
  - [Adapter](#adapter)
  - [Decorator](#decorator)
  - [Facade](#facade)
  - [Proxy](#proxy)
- [Behavioral](#behavioral-patterns)
  - [Command](#command)
  - [Iterator](#iterator)
  - [Observer](#observer)
  - [State](#state)
  - [Strategy](#strategy)
  - [Template method](#template-method)

## Creational Patterns

### 🏭 Factory

A generic interface for creating objects

```js
const createVehicle = options => {
  switch (options.vehicleType) {
    case 'car':
      return {doors: 4, color: 'silver', ...options}
    case 'truck':
      return {doors: 2, color: 'black', ...options}
  }
}

const pinkCar = createVehicle({
  vehicleType: 'car',
  color: 'pink',
})
```

### 📦 Module

```js
const myModule = {
  property: 'boop',
  sayProperty() {
    console.log(this.property)
  },
}
```

### 🗃 Revealing Module

```js
const revealingModule = (() => {
  let privateProperty = 0

  return {
    publicProperty: 42,
    publicMethod() {
      console.log('boop: ', privateProperty++)
    },
  }
})()
```

## Structural Patterns

### 🔌 Adapter

Translates an interface for an object into one that is compatible with a
specific system

```js
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
```

### 👒 Decorator

A way to extend responsibilities of an object dynamically

```js
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
```

### 🎭 Facade

A higher-level interface that makes a subsystem easier to use

```js
const addEvent = (el, ev, fn) => {
  if (el.addEventListener) {
    el.addEventListener(ev, fn, false)
  } else if (el.attachEvent) {
    el.attachEvent(`on${ev}`, fn)
  } else {
    el[`on${ev}`] = fn
  }
}
```

### 🎮 Proxy

The use of a placeholder for another object to control access to it

```js
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
```

## Behavioral Patterns

### 📮 Command

Encapsulate requests as objects enabling parameterizing clients with different
requests, queueing or logging requests, and supporting undoable operations

```js
const createStore = reducer => {
  let state = reducer(undefined, {})

  return {
    getState: () => state,
    dispatch: action => {
      state = reducer(state, action)
    },
  }
}

const countReducer = (state = {count = 0}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {count: state.count + 1}
    case 'DECREMENT':
      return {count: state.count - 1}
    default:
      return state
  }
}

const countStore = createStore(countReducer)

countStore.dispatch({type: 'INCREMENT'})
countStore.dispatch({type: 'DECREMENT'})
```

### ➰ Iterator

Provides a way to access elements of an aggregate object sequentially
without exposing its underlying representation

```js
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
```

### 👁‍🗨 Observer

A one-to-many dependency between objects in which a change in the subject
notifies dependants

```js
class ObserverList {
  constructor() {
    this._observers = []
  }

  add(obj) {
    return this._observers.push(obj)
  }

  count() {
    return this._observers.length
  }

  get(idx) {
    return this._observers[idx]
  }

  getAll() {
    return this._observers
  }

  indexOf(obj) {
    return this._observers.findIndex(observer => observer === obj)
  }

  removeAt(idx) {
    this._observers.splice(idx, 1)
  }
}

class Subject {
  constructor() {
    this.observers = new ObserverList()
  }

  addObserver(observer) {
    this.observers.add(observer)
  }

  removeObserver(observer) {
    this.observers.removeAt(this.observers.indexOf(observer))
  }

  notify(ctx) {
    this.observers.getAll().forEach(observer => observer.update(ctx))
  }
}

class Observer {
  update() {}
}

const subject = new Subject()
const observer = new Observer()

observer.update = ctx => console.log('update: ', ctx)
subject.addObserver(observer)

subject.notify('boop')
```

### 📅 State

Allows an object to alter its behavior as its internal state changes

```js
const TEXT_EDITOR_TRANSFORMS = {
  default: str => str,
  upper: str => str.toUpperCase(),
  lower: str => str.toLowerCase(),
}

const textEditor = (() => {
  let transform = 'default'

  return {
    setTransform: newTransform => (transform = newTransform),
    type: words => console.log(TEXT_EDITOR_TRANSFORMS[transform](words)),
  }
})()

textEditor.type('boop')
textEditor.setTransform('upper')
textEditor.type('yelling')
textEditor.setTransform('lower')
textEditor.type('WhISPERING')
```

### 🗄 Strategy

A family of interchangeable algorithms that can vary independently from
the clients that use them

```js
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
```

### 📜 Template method

Defines a skeleton of an algorithm in a method to be redefined by subclasses

```js
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
```

## References

- [Head First Design Patterns](http://ce.sharif.edu/courses/98-99/2/ce484-1/resources/root/Design%20Patterns/Eric%20Freeman,%20Elisabeth%20Freeman,%20Kathy%20Sierra,%20Bert%20Bates-Head%20First%20Design%20Patterns%20-OReilly%20(2008).pdf) by Eric Freeman, Elisabeth Freeman, Kathy Sierra & Bert Bates
- [Design Patterns: Elements of Reusable Object-Oriented Software](http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf) by Erich Gamma, Richard Helm, Ralph Johnson & John Vlissides
- [Composing Software](https://medium.com/javascript-scene/composing-software-the-book-f31c77fc3ddc) by Eric Elliott
