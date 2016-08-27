const withActionsLog = (actions = []) => (snapshot) => ({
  ...snapshot,
  getActions: () => actions,
  getNext: (action) => withActionsLog(
    [...actions, action]
  )(
    snapshot.getNext(action)
  )
})

export default withActionsLog
