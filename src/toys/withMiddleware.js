const withMiddleware = (middleware) => (snapshot) => ({
  ...snapshot,

  getNext: (action) => {
    const nextSnapshot = snapshot.getNext(middleware(action, snapshot))

    return {
      ...nextSnapshot,
      getNext: withMiddleware(middleware)(nextSnapshot).getNext
    }
  }
})

export default withMiddleware
