import React from 'react'
import { render } from 'react-dom'
import snapshot from 'toys/snapshot'
import withActionsLog from 'toys/withActionsLog'
import withMiddleware from 'toys/withMiddleware'
import withPrevState from 'toys/withPrevState'
import withSubscriber from 'toys/withSubscriber'
import withInitialState from 'toys/withInitialState'
import withRewind from 'toys/withRewind'

import compose from 'lib/compose'

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
  console.log('ACTION', action)

  return action
}

const loggingSubscriber = ({ getState, getPrevState, getInitialState }) => {
  console.log('INITIAL STATE', getInitialState())
  console.log('PREV STATE', getPrevState())
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
  withRewind()
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

const snapshots = [
  snapshot1,
  snapshot2,
  snapshot3,
  snapshot4,
  snapshot5
]

const listItem = ({ name }) => <li>{name}</li>
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
