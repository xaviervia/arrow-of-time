const withRedo = (snapshot) => ({
  ...snapshot,

  rewind: () => {
    const prev = snapshot.rewind()
    console.log('HERE?')

    return {
      ...prev,
      redo: () => snapshot
    }
  },

  getNext: (action) => {
    const nextSnapshot = snapshot.getNext(action)
    const nextWithRedo = withRedo(snapshot)
    console.log('here?')

    return {
      ...nextSnapshot,
      redo: nextWithRedo.redo,
      rewind: nextWithRedo.rewind
    }
  }
})

export default withRedo
