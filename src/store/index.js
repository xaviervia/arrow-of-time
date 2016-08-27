import _subscribable from './subscribable'
import timeline, { subscribe } from '../timeline'

export const base = (snapshot) => {
  return {
    dispatch: (action) => {
      snapshot = snapshot.getNext(action)
    },

    getState: () => snapshot.getState(),

    eject: (f) => {
      snapshot = f(snapshot)
    }
  }
}

export const subscribable = _subscribable

export default function (...xs) {
  return subscribable(subscribe)(base)(timeline(...xs))
}
