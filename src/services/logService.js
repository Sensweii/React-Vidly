// import Raven from 'raven-js';

function init() {
  // Raven.config('RAVEN_API_KEY', {
  //   release: '1.0.0',
  //   environment: 'development'
  // }).install();
}

function log(error) {
  console.log(error)
  // Raven.captureException(error);
}

export default {
  init,
  log
}