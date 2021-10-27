module.exports = (requiredEnvVariables) => {
  return requiredEnvVariables.filter((envName) => {
    return !process.env[envName]
  })
}
