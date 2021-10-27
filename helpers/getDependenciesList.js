const cmsConfigs = require('../config/cms')
const searchConfigs = require('../config/search')
const paymentConfigs = require('../config/payment')
const commerceConfigs = require('../config/commerce')

module.exports = ({ commerce, cms, payment, search }) => {
  const dependencies = {}

  commerceConfigs[commerce] && Object.assign(dependencies, commerceConfigs[commerce].dependencies)
  cmsConfigs[cms] && Object.assign(dependencies, cmsConfigs[cms].dependencies)
  paymentConfigs[payment] && Object.assign(dependencies, paymentConfigs[payment].dependencies)
  searchConfigs[search] && Object.assign(dependencies, searchConfigs[search].dependencies)

  return dependencies
}
