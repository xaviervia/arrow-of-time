const withAction = (action) => (snapshot) => ({
  ...snapshot,

  getAction: () => action,

  getNext: (action) => {
    const nextSnapshot = snapshot.getNext(action)
    const nextWithAction = withAction(action)(nextSnapshot)

    return {
      ...nextSnapshot,
      getAction: nextWithAction.getAction,
      getNext: nextWithAction.getNext
    }
  }
})

export default withAction
