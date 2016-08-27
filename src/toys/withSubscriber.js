const withSubscriber = (subscriber) => (snapshot) => ({
  ...snapshot,

  getNext: (action) => {
    const nextSnapshot = snapshot.getNext(action)

    subscriber(nextSnapshot)

    return {
      ...nextSnapshot,
      getNext: withSubscriber(subscriber)(nextSnapshot).getNext
    }
  }
})

export default withSubscriber
