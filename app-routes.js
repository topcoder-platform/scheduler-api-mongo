/**
 * Configure all routes for express app
 */
const _ = require('lodash')
const config = require('config')
const HttpStatus = require('http-status-codes')
const helper = require('./src/common/helper')
const routes = require('./src/routes')

/**
 * Configure all routes for express app
 * @param app the express app
 */
module.exports = (app) => {
  // Load all routes
  _.each(routes, (verbs, path) => {
    _.each(verbs, (def, verb) => {
      const controllerPath = `./src/controllers/${def.controller}`
      const method = require(controllerPath)[def.method]; // eslint-disable-line
      if (!method) {
        throw new Error(`${def.method} is undefined`)
      }

      const actions = []
      actions.push((req, res, next) => {
        req.signature = `${def.controller}#${def.method}`
        next()
      })

      actions.push(method)
      app[verb](`${config.API_VERSION}${path}`, helper.autoWrapExpress(actions))
    })
  })

  // Check if the route is not found or HTTP method is not supported
  app.use('*', (req, res) => {
    const route = routes[req.baseUrl]
    let status
    let message
    if (route) {
      status = HttpStatus.METHOD_NOT_ALLOWED
      message = 'The requested HTTP method is not supported.'
    } else {
      status = HttpStatus.NOT_FOUND
      message = 'The requested resource cannot be found.'
    }
    res.status(status).json({ message })
  })
}
