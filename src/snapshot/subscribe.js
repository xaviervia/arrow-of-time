const subscribe = (subscriber) => (snapshot) => ({
  ...snapshot,

  getNext: (action) => {
    const nextSnapshot = snapshot.getNext(action)

    subscriber(nextSnapshot)

    return {
      ...nextSnapshot,
      getNext: subscribe(subscriber)(nextSnapshot).getNext
    }
  }
})

export default subscribe
