const withGetAction = (action) => (snapshot) => ({
  ...snapshot,

  getAction: () => action,

  getNext: (action) => {
    const nextSnapshot = snapshot.getNext(action)
    const nextWithAction = withGetAction(action)(nextSnapshot)

    return {
      ...nextSnapshot,
      getAction: nextWithAction.getAction,
      getNext: nextWithAction.getNext
    }
  }
})

export default withGetAction
