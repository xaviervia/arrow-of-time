import redoable from './snapshot/redoable'
import snapshot from './snapshot'
import compose from './lib/compose'

export default function (...xs) {
  return redoable()(snapshot(...xs))
}
