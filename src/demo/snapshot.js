import React from 'react'
import { render } from 'react-dom'
import snapshot from '../snapshot'
import withAction from '../snapshot/withAction'
import withActionsLog from '../snapshot/withActionsLog'
import withMiddleware from '../snapshot/withMiddleware'
import withPrevState from '../snapshot/withPrevState'
import withSubscriber from '../snapshot/withSubscriber'
import withInitialState from '../snapshot/withInitialState'
import withRewind from '../snapshot/withRewind'

import compose from '../lib/compose'
import times from '../lib/times'

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload]
      }

    default:
      return state
  }
}

const loggingMiddleware = (action) => {
  console.log('NEW ACTION', action)

  return action
}

const loggingSubscriber = ({ getState, getPrevState, getInitialState, getAction }) => {
  console.log('INITIAL STATE', getInitialState())
  console.log('PREV STATE', getPrevState())
  console.log('ACTION', getAction())
  console.log('STATE', getState())
}

const initialState = { items: [] }
const initialSnapshot = snapshot(reducer, initialState)

const start = compose(
  withActionsLog([]),
  withMiddleware(loggingMiddleware),
  withSubscriber(loggingSubscriber),
  withPrevState,
  withInitialState(),
  withRewind(),
  withAction()
)(initialSnapshot)

const snapshot1 = start.getNext({
  type: 'ADD_ITEM',
  payload: { name: 'Milk' }
})

const snapshot2 = snapshot1.getNext({
  type: 'ADD_ITEM',
  payload: { name: 'Sugar' }
})

const snapshot3 = snapshot2.getNext({
  type: 'ADD_ITEM',
  payload: { name: 'Honey' }
})

const snapshot4 = snapshot3.getNext({
  type: 'ADD_ITEM',
  payload: { name: 'Coriander' }
})

const snapshot5 = snapshot4.rewind()

const snapshot6 = snapshot5.rewind()

const snapshot7 = snapshot6.rewind()

const rewind = (amount) => (snapshot) =>
  times(amount)(
    (rewinded) => rewinded.rewind(),
    snapshot
  )

const snapshots = [
  snapshot1,
  snapshot2,
  snapshot3,
  snapshot4,
  snapshot5,
  snapshot6,
  snapshot7,
  rewind(3)(snapshot4)
]

const listItem = ({ name }, i) => <li key={i}>{name}</li>
const list = (snapshot) => <ul>{snapshot.getState().items.map(listItem)}</ul>

render(
  <div>
    {snapshots.map(list)}
    <h2>Actions</h2>
    {snapshot4.getActions().map(({ type, payload }) => (
      <dl>
        <dt>{type}</dt>
        <dd>{payload.name}</dd>
      </dl>
    ))}
  </div>
  , document.getElementById('arrow-of-time')
)
