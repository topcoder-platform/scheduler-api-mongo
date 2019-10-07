/**
 * Create events in TC autopilot scheduler
 */

require('../app-bootstrap')
const config = require('config')
const superagent = require('superagent')
const logger = require('../src/common/logger')

logger.info('Create scheduler events.')

const createEvents = async () => {
  const url = `http://localhost:${config.PORT}${config.API_VERSION}/autopilot/scheduler/events`
  const endpoint = 'http://localhost:4000/callback'
  const currentMS = new Date().getTime()

  // add events for different HTTP methods
  await superagent.post(url).send({
    scheduledTime: new Date(currentMS + 12000).toISOString(),
    endpoint,
    verb: 'get',
    headers: { header1: 'xx1', header2: 'yy1' }
  })

  await superagent.post(url).send({
    scheduledTime: new Date(currentMS + 13000).toISOString(),
    endpoint,
    verb: 'head',
    headers: { header1: 'xx2', header2: 'yy2' }
  })

  await superagent.post(url).send({
    scheduledTime: new Date(currentMS + 14000).toISOString(),
    endpoint,
    verb: 'post',
    payload: { field1: 11, field2: 22 },
    headers: { header1: 'xx3', header2: 'yy3' }
  })

  await superagent.post(url).send({
    scheduledTime: new Date(currentMS + 15000).toISOString(),
    endpoint,
    verb: 'put',
    payload: { field1: 33, field2: 44 },
    headers: { header1: 'xx4', header2: 'yy4' }
  })

  await superagent.post(url).send({
    scheduledTime: new Date(currentMS + 16000).toISOString(),
    endpoint,
    verb: 'patch',
    payload: { abc: 'xyz' },
    headers: { header1: '5xx' }
  })

  await superagent.post(url).send({
    scheduledTime: new Date(currentMS + 17000).toISOString(),
    endpoint,
    verb: 'delete'
  })

  // create a failure case, the API is not found
  await superagent.post(url).send({
    scheduledTime: new Date(currentMS + 18000).toISOString(),
    endpoint: 'http://localhost:4000/not-found',
    verb: 'post'
  })
}

createEvents().then(() => {
  logger.info('Done!')
  process.exit()
}).catch((e) => {
  logger.logFullError(e)
  process.exit()
})
