export default (subscribe) => (store) => {
  const subscribers = []

  return (snapshot) => {
    const plainStore = store(snapshot)

    return {
      ...plainStore,

      dispatch: (x) => {
        plainStore.dispatch(x)

        subscribers.forEach((callback) => callback({
          ...plainStore.eject(),
          ...plainStore
        }))
      },

      update: (f) => {
        plainStore.update(f)
        subscribers.forEach((callback) => callback({
          ...plainStore.eject(),
          ...plainStore
        }))
      },

      subscribe: (callback) => {
        subscribers.push(callback)

        return () => subscribers.splice(subscribers.indexOf(callback), 1)
      }
    }
  }
}
