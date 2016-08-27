/**
 * Sagui configuration object
 * see: http://sagui.js.org/
 */
const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = {
  pages: [
    'demo/index',
    'demo/snapshot',
    'demo/store',
    'demo/timeline'
  ],

  libraries: [
    'index',
    'snapshot/index',
    'store/index',
    'timeline/index'
  ],

  webpack: {
    plugins: [
      new DashboardPlugin()
    ]
  }
}
