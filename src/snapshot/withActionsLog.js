// NOTE: This is derivative, can be calculated as getLog from
// a snapshot with getAction and rewind
const withActionsLog = (actions = []) => (snapshot) => ({
  ...snapshot,
  getActions: () => actions,
  getNext: (action) => withActionsLog(
    [...actions, action]
  )(snapshot.getNext(action))
})

export default withActionsLog
