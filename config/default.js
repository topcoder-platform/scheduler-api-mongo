/**
 * The configuration file.
 */

module.exports = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  PORT: process.env.PORT || 3000,
  // API version path prefix, empty for now, could be '/v5', '/api/v1' etc.
  API_VERSION: process.env.API_VERSION || '',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/autopilotscheduler'
}
