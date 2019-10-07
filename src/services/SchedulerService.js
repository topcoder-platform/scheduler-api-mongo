/**
 * This service provides operations of scheduler.
 */
const _ = require('lodash')
const Joi = require('joi')
const config = require('config')
const uuid = require('uuid/v4')
const logger = require('../common/logger')
const MSM = require('mongo-scheduler-more')

const scheduler = new MSM(config.MONGODB_URI, { doNotFire: true })
const schedulerAsync = Promise.promisifyAll(scheduler)

/**
 * Create event.
 * @param {Object} data the data to create event
 * @returns {Object} the created event
 */
async function createEvent (data) {
  const evt = {
    name: uuid(), // use a new unique UUID as event name
    after: data.scheduledTime,
    data: _.pick(data, ['endpoint', 'verb', 'payload', 'headers'])
  }
  await schedulerAsync.scheduleAsync(evt)
  return evt
}

createEvent.schema = {
  data: Joi.object().keys({
    scheduledTime: Joi.date().required(),
    endpoint: Joi.string().uri().required(),
    verb: Joi.string().valid('get', 'head', 'post', 'put', 'patch', 'delete').required(),
    payload: Joi.object(),
    headers: Joi.object()
  }).required()
}

module.exports = {
  createEvent
}

logger.buildService(module.exports)
