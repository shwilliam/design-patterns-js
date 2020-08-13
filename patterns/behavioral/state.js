/*
 * State Pattern
 * =============
 *
 * Allows an object to alter its behavior as its internal state changes
 *
 */

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
