/*
 * Command Pattern
 * ===============
 *
 * Encapsulate requests as objects enabling parameterizing clients with different
 * requests, queueing or logging reqeusts, and supporting undoable operations
 *
 */

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
