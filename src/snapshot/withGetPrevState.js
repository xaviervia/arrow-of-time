// NOTE: Peek previous state instead
const withGetPrevState = (snapshot) => ({
  ...snapshot,

  getNext: (action) => {
    const nextSnapshot = snapshot.getNext(action)

    return {
      ...nextSnapshot,
      getPrevState: () => snapshot.getState(),
      getNext: withGetPrevState(nextSnapshot).getNext
    }
  }
})

export default withGetPrevState
