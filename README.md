# 🏹 Arrow of Time

Redux inspired composable store that treats the snapshots as first class.

Experiment with minimum possible composable implementation of a history (such as a Redux store, Act history, etc).

As of v0.1.3, the Store is API compatible with the Redux store, and tested working in integration with `react-redux`, which means that you can use it as a drop-in replacement of Redux. Redux middlewares and enhancers will however not work on Arrow of Time, but the point of the experiment is to some extent to prove that subscribers are enough, especially if timeline traversing experimentation tools are going to be used.

To try it out, clone the repo and `npm install`. Then `npm start` and head to `http://localhost:3000/demo/timeline.html` and `http://localhost:3000/demo/snapshot.html`. You can also take a look in the [Test Arrow of Time](https://github.com/xaviervia/test-arrow-of-time/blob/master/src/redux.js#L53) repo, that features an example of using Arrow of Time with React Redux.

Arrow of Time is heavily inspired by @Nevon's [demystifying Redux](https://gist.github.com/Nevon/eada09788b10b6a1a02949ec486dc3ce) article and Act's [first class History](https://github.com/act-framework/act/blob/master/packages/main/internals/History.js). To some extent, the idea is to merge the purposes of:

- Implement a store as a composition, built up from small transparent pieces
- Bring the history to first class level treatment

If the hypothesis that Arrow of Time is built upon is correct, this should lead to a very composable history solution that can be extended to support all kinds of madness (time travel, multiple timelines, session replay, etc). The motivation for trying to achieve this is to gain the ability of interacting with the app history in the same way that the Redux DevTools currently do, but programmatically and with simple APIs.

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

timelines.push(timelines[2].rewind())
timelines.push(timelines[3].rewind())
timelines.push(timelines[4].redo())
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
