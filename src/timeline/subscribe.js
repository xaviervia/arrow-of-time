const subscribe = (subscriber) => (snapshot) => ({
  ...snapshot,

  rewind: () => {
    const prev = snapshot.rewind()
    const prevWithSubscriber = subscribe(subscriber)(prev)

    subscriber(prev)

    return {
      ...prev,
      redo: prevWithSubscriber.redo,
      rewind: prevWithSubscriber.rewind,
      getNext: prevWithSubscriber.getNext
    }
  },

  redo: () => {
    const next = snapshot.redo()
    const nextWithSubscriber = subscribe(subscriber)(next)

    subscriber(next)

    return {
      ...next,
      redo: nextWithSubscriber.redo,
      rewind: nextWithSubscriber.rewind,
      getNext: nextWithSubscriber.getNext
    }
  },

  getNext: (action) => {
    const nextSnapshot = snapshot.getNext(action)
    const nextWithSubscriber = subscribe(subscriber)(nextSnapshot)

    subscriber(nextSnapshot)

    return {
      ...nextSnapshot,
      rewind: nextWithSubscriber.rewind,
      redo: nextWithSubscriber.redo,
      getNext: nextWithSubscriber.getNext
    }
  }
})

export default subscribe
