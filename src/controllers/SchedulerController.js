/**
 * Controller for scheduler endpoints
 */
const HttpStatus = require('http-status-codes')
const service = require('../services/SchedulerService')

/**
 * Create event
 * @param {Object} req the request
 * @param {Object} res the response
 */
async function createEvent (req, res) {
  const result = await service.createEvent(req.body)
  res.status(HttpStatus.CREATED).send(result)
}

module.exports = {
  createEvent
}
