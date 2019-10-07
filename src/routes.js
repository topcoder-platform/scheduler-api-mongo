/**
 * Contains all routes.
 */

module.exports = {
  '/autopilot/scheduler/events': {
    post: {
      controller: 'SchedulerController',
      method: 'createEvent'
    }
  }
}
