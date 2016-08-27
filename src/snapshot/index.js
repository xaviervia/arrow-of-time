import compose from '../lib/compose'
import _withGetAction from './withGetAction'
import _withGetInitialState from './withGetInitialState'
import _withGetPrevState from './withGetPrevState'

export const base = (reducer, initialState) => ({
  getNext: (action) => base(reducer, reducer(initialState, action)),
  getState: () => initialState
})

export default function (...xs) {
  return compose(
    _withGetAction(),
    _withGetPrevState,
    _withGetInitialState()
  )(base(...xs))
}

export { default as redoable } from './redoable'
export { default as rewindable } from './rewindable'
export { default as subscribe } from './subscribe'
export { default as withGetActionsLog } from './withGetActionsLog'
export { default as withMiddleware } from './withMiddleware'

export const withGetAction = _withGetAction
export const withGetInitialState = _withGetInitialState
export const withGetPrevState = _withGetPrevState
