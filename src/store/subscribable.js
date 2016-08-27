export default (subscribe) => (store) => {
  const subscribers = []

  return (snapshot) => {
    return {
      ...store(
        subscribe(
          (snapshot) => subscribers.forEach((f) => f(snapshot))
        )(
          snapshot
        )
      ),

      subscribe: (callback) => {
        subscribers.push(callback)

        return () => subscribers.splice(subscribers.indexOf(callback), 1)
      }
    }
  }
}
