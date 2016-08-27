const withRewind = (prevSnapshot) => (snapshot) => ({
  ...snapshot,

  rewind: () => {
    console.log('ORIGINAL REWIND')

    return prevSnapshot
  },

  getNext: (action) => {
    const nextSnapshot = snapshot.getNext(action)
    const nextWithRewind = withRewind(
      withRewind(prevSnapshot)(snapshot)
    )(nextSnapshot)

    return {
      ...nextSnapshot,
      rewind: nextWithRewind.rewind,
      getNext: nextWithRewind.getNext
    }
  }
})

export default withRewind
