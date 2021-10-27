require('dotenv').config()
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const inquirer = require('inquirer')
const { validateCms } = require('../helpers')
const consola = require('consola')

return (() => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'cms',
        message: 'Which CMS are you setting up?',
        choices: [
          { name: 'Amplience', value: 'amplience' },
          { name: 'Contentful', value: 'contentful' },
          { name: 'Contentstack', value: 'contentstack' },
          { name: 'Storyblok', value: 'storyblok' },
        ],
      },
      {
        type: 'list',
        name: 'type',
        message: 'What operation you would like to perform?',
        choices: [
          { name: 'Set up CMS space ', value: 'setup' },
          { name: 'Update configs in this repo', value: 'update' },
        ],
      },
    ])
    .then(({ cms, type }) => {
      const { missingEnvVariables } = validateCms(cms, true)

      if (missingEnvVariables.length) {
        throw {
          message: `Missing ${missingEnvVariables.length} env variables!`,
          missingEnvVariables,
        }
      }

      return exec(`node cms/scripts/${cms}.js ${type === 'update' && '--update:schema'}`)
    })
    .then((output) => console.log(output.stdout))
    .catch((err) => {
      consola.error(err.message)
      console.table(err.missingEnvVariables)
    })
})()
