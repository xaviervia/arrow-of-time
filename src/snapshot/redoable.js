const redoable = (prev) => (snapshot) => ({
  ...snapshot,

  rewind: () => {
    console.log('ORIGINAL REWIND')

    return {
      ...prev,
      redo: () => snapshot
    }
  },

  getNext: (action) => {
    const next = snapshot.getNext(action)
    const nextRedoable = redoable(redoable(prev)(snapshot))(next)

    return {
      ...next,
      rewind: nextRedoable.rewind,
      getNext: nextRedoable.getNext
    }
  }
})

export default redoable
