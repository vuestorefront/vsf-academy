const logger = (data, type = 'error') => {
  const { status, message, response, name, debug } = data
  return console.error(`vsf-tu: ${name} space copy error [${status} ${message}]`, debug ? response : '')
}

module.exports = Object.freeze({
  logger,
})
