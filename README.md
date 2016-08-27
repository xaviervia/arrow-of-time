# Arrow of time

Experiment with minimum possible composable implementation of a history (such as a Redux store, Act history, etc).

To try it out, clone the repo and `npm install`. Then `npm start` and head to `http://localhost:3000/demo/timeline.html` and `http://localhost:3000/demo/snapshot.html`.

## Install

```
npm install --save-dev arrow-of-time
```
## Snapshot

```javascript
import getSnapshot, { subscribe } from 'arrow-of-time/snapshot'

const snapshot = getSnapshot((state, action) => {
  switch (action.type) {
    case 'item':
      return {
        ...state,
        items: [...state.items, action.payload]
      }

    case 'article':
      return {
        ...state,
        articles: [...state.articles, action.payload]
      }
    default:
      state
  }
}, { items: [], articles: [] })

const subscribedSnapshot = subscribe(({ getAction, getState }) => {
  console.log('ACTION', getAction())
  console.log('STATE', getState())
})(snapshot)

const snapshots = []

snapshots.push(subscribedSnapshot.getNext({ type: 'item', payload: 'home' }))
snapshots.push(snapshots[0].getNext({ type: 'item', payload: 'sea' }))
snapshots.push(snapshots[1].getNext({ type: 'item', payload: 'mountains' }))
```

## Timeline

```javascript
import getTimeline, { subscribe } from 'arrow-of-time/timeline'

const timeline = getTimeline((state, action) => {
  switch (action.type) {
    case 'item':
      return {
        ...state,
        items: [...state.items, action.payload]
      }

    case 'article':
      return {
        ...state,
        articles: [...state.articles, action.payload]
      }
    default:
      state
  }
}, { items: [], articles: [] })

const subscribedTimeline = subscribe(({ getAction, getState }) => {
  console.log('ACTION', getAction())
  console.log('STATE', getState())
})(timeline)

const timelines = []

timelines.push(subscribedTimeline.getNext({ type: 'item', payload: 'home' }))
timelines.push(timelines[0].getNext({ type: 'item', payload: 'sea' }))
timelines.push(timelines[1].getNext({ type: 'item', payload: 'mountains' }))

timeline.rewind()
timeline.rewind()
timeline.redo()
```

## Store

```javascript
import getStore from 'arrow-of-time/store'

const store = getStore((state, action) => {
  switch (action.type) {
    case 'item':
      return {
        ...state,
        items: [...state.items, action.payload]
      }

    case 'article':
      return {
        ...state,
        articles: [...state.articles, action.payload]
      }
    default:
      state
  }
}, { items: [], articles: [] })

store.subscribe(({ getAction, getState }) => {
  console.log('ACTION', getAction())
  console.log('STATE', getState())
})(timeline)

store.dispatch({ type: 'item', payload: 'home' }))
store.dispatch(timelines[0].getNext({ type: 'item', payload: 'sea' }))
store.dispatch(timelines[1].getNext({ type: 'item', payload: 'mountains' }))

store.update((timeline) => timeline.rewind())
store.update((timeline) => timeline.rewind())
store.update((timeline) => timeline.redo())
```

## Known issues

- `redoable` and `rewindable` need to be the outermost higher order snapshots to be applied, because the way they work they will not play well in spreading the properties set by other higher order snapshots.
