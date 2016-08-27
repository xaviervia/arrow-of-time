import React from 'react'
import { render } from 'react-dom'
import { store } from '../'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, payload]
      }

    default:
      state
  }
}

const initialState = {
  items: []
}

const mainStore = store(reducer, initialState)

mainStore.subscribe(({ getState }) => {
  console.log('NEW STATE', getState())
})

mainStore.dispatch({
  type: 'ADD_ITEM',
  payload: 'Milk'
})

mainStore.dispatch({
  type: 'ADD_ITEM',
  payload: 'Honey'
})

mainStore.dispatch({
  type: 'ADD_ITEM',
  payload: 'Cream'
})

mainStore.eject((timeline) => timeline.rewind())

render(
  <div>
    <ul>
      {mainStore.getState().items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
  , document.getElementById('arrow-of-time')
)
