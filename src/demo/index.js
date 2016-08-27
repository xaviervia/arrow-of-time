import React from 'react'
import { render } from 'react-dom'
import snapshot from '../snapshot'
import redoable from '../snapshot/redoable'
import withActionsLog from '../snapshot/withActionsLog'
import withSubscriber from '../snapshot/withSubscriber'

import compose from '../lib/compose'

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

const initialState = { items: [] }
const initialSnapshot = snapshot(reducer, initialState)

const subscriber = (counter = 0) => (snapshot) => {
  counter ++

  console.log(`Snapshot #${counter}`, snapshot, snapshot.getState())
}

const start = compose(
  withActionsLog([]),
  redoable(),
  withSubscriber(subscriber())
)(initialSnapshot)

console.log('Start', start)

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

const snapshot6 = snapshot5.redo()

const snapshots = [
  snapshot1,
  snapshot2,
  snapshot3,
  snapshot4,
  snapshot5,
  snapshot6
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
