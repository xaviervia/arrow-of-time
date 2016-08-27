const withPrevState = (snapshot) => ({
  ...snapshot,

  getNext: (action) => {
    const nextSnapshot = snapshot.getNext(action)

    return {
      ...nextSnapshot,
      getPrevState: () => snapshot.getState(),
      getNext: withPrevState(nextSnapshot).getNext
    }
  }
})

export default withPrevState
