/*
 * Observer Pattern
 * ================
 *
 * A one-to-many dependency between objects in which a change in the subject
 * notifies dependants
 *
 */

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
