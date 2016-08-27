/**
 * Sagui configuration object
 * see: http://sagui.js.org/
 */
module.exports = {
  pages: [
    'demo/index',
    'demo/snapshot',
    'demo/timeline'
  ],

  libraries: [
    'snapshot',
    'timeline',
    'snapshot/withActionsLog',
    'snapshot/withInitialState',
    'snapshot/withMiddleware',
    'snapshot/withPrevState',
    'snapshot/withRewind',
    'snapshot/withSubscriber'
  ]
}
