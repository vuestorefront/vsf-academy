const cmsConfigs = require('../config/cms')
const searchConfigs = require('../config/search')
const paymentConfigs = require('../config/payment')
const commerceConfigs = require('../config/commerce')

module.exports = ({ commerce, cms, payment, search }) => {
  const dependencies = {},
    resolutions = {};

  commerceConfigs[commerce] && Object.assign(dependencies, commerceConfigs[commerce].dependencies)
  cmsConfigs[cms] && Object.assign(dependencies, cmsConfigs[cms].dependencies)
  paymentConfigs[payment] && Object.assign(dependencies, paymentConfigs[payment].dependencies)
  searchConfigs[search] && Object.assign(dependencies, searchConfigs[search].dependencies)

  commerceConfigs[commerce] && Object.assign(resolutions, commerceConfigs[commerce].resolutions)
  cmsConfigs[cms] && Object.assign(resolutions, cmsConfigs[cms].resolutions)
  paymentConfigs[payment] && Object.assign(resolutions, paymentConfigs[payment].resolutions)
  searchConfigs[search] && Object.assign(resolutions, searchConfigs[search].resolutions)

  return [ dependencies, resolutions ]
}
