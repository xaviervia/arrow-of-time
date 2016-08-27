const snapshot = (reducer, initialState) => ({
  getNext: (action) => snapshot(reducer, reducer(initialState, action)),
  getState: () => initialState
})

export default snapshot
