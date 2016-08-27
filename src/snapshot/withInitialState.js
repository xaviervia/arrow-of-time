const withInitialState = (initialState) => (snapshot) => ({
  ...snapshot,

  getInitialState: () => initialState || snapshot.getState(),

  getNext: (action) => {
    const nextSnapshot = snapshot.getNext(action)
    const nextWithInitialState = withInitialState(initialState || snapshot.getState())(nextSnapshot)

    return {
      ...nextSnapshot,
      getInitialState: nextWithInitialState.getInitialState,
      getNext: nextWithInitialState.getNext
    }
  }
})

export default withInitialState
