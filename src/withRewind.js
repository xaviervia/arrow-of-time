const withRewind = (prevSnapshot) => (snapshot) =>
  (console.log('prev snap', prevSnapshot), true) &&
  (console.log('snap', snapshot), true) &&
({
  ...snapshot,

  rewind: () => prevSnapshot,

  getNext: (action) => {
    const nextSnapshot = snapshot.getNext(action)
    const nextWithRewind = withRewind(snapshot)(nextSnapshot)

    return {
      ...nextSnapshot,
      rewind: nextWithRewind.rewind,
      getNext: nextWithRewind.getNext
    }
  }
})

export default withRewind
