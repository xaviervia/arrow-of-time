import React from 'react'
import { render } from 'react-dom'
import timeline, { subscribe } from '../timeline'
import { withGetActionsLog } from '../snapshot'

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
const initialTimeline = timeline(reducer, initialState)

const subscriber = (counter = 0) => (timeline) => {
  counter ++

  console.log(`Timeline #${counter}`, timeline, timeline.getAction(), timeline.getState())
}

const start = compose(
  withGetActionsLog([]),
  subscribe(subscriber())
)(initialTimeline)

console.log('Start', start)

const timeline1 = start.getNext({
  type: 'ADD_ITEM',
  payload: { name: 'Milk' }
})

const timeline2 = timeline1.getNext({
  type: 'ADD_ITEM',
  payload: { name: 'Sugar' }
})

const timeline3 = timeline2.getNext({
  type: 'ADD_ITEM',
  payload: { name: 'Honey' }
})

const timeline4 = timeline3.getNext({
  type: 'ADD_ITEM',
  payload: { name: 'Coriander' }
})

const timeline5 = timeline4.rewind()

const timeline6 = timeline5.redo()

const timelines = [
  timeline1,
  timeline2,
  timeline3,
  timeline4,
  timeline5,
  timeline6
]

const listItem = ({ name }) => <li>{name}</li>
const list = (timeline) => <ul>{timeline.getState().items.map(listItem)}</ul>

render(
  <div>
    {timelines.map(list)}
    <h2>Actions</h2>
    {timeline4.getActions().map(({ type, payload }) => (
      <dl>
        <dt>{type}</dt>
        <dd>{payload.name}</dd>
      </dl>
    ))}
  </div>
  , document.getElementById('arrow-of-time')
)
