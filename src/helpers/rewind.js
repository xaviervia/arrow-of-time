import times from '../lib/times'

export default (amount) => (rewindable) =>
  times(amount)((x) => x.rewind(), rewindable)
