import {
  base as snapshot,
  redoable,
  withGetAction,
  withGetInitialState,
  withGetPrevState
} from '../snapshot'
import compose from '../lib/compose'

export const base = function (...xs) {
  return redoable()(snapshot(...xs))
}

export default function (...xs) {
  return compose(
    withGetAction(),
    withGetPrevState,
    withGetInitialState()
  )(base(...xs))
}

export { default as subscribe } from './subscribe'
