require('dotenv').config()
const { execSync } = require('child_process')
const { existsSync, readFileSync, writeFileSync } = require('fs')
const inquirer = require('inquirer')
const consola = require('consola')
const figlet = require('figlet')
const { validateCommerce, validateCms, validateSearch, getDependenciesList } = require('./helpers')

return (async () => {
  console.log(
    figlet.textSync('enterprise theme', {
      font: 'speed',
      whitespaceBreak: true,
      width: 80,
    }),
  )

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'How would you name your project?',
        validate: (input) => (input.length ? true : 'Project name is required'),
      },
      {
        type: 'list',
        name: 'commerce',
        message: 'Which commerce are you going to use?',
        choices: [
          { name: 'Commercetools', value: 'commercetools' },
          { name: 'Shopify', value: 'shopify' },
        ],
      },
      {
        type: 'list',
        name: 'extension',
        message: 'Which extension are you going to use?',
        choices: [
          { name: 'None', value: false },
          { name: 'Click & Collect', value: 'click-and-collect' },
        ],
        when: (answers) => answers.commerce === 'commercetools',
      },
      {
        type: 'list',
        name: 'cms',
        message: 'Which CMS are you going to use?',
        choices: [
          { name: 'None', value: false },
          { name: 'Amplience', value: 'amplience' },
          { name: 'Contentful', value: 'contentful' },
          { name: 'Contentstack', value: 'contentstack' },
          { name: 'Storyblok', value: 'storyblok' },
        ],
        when: (answers) => answers.commerce === 'commercetools',
      },
      {
        type: 'list',
        name: 'search',
        message: 'Which search engine are you going to use?',
        choices: [
          { name: 'None', value: false },
          { name: 'Algolia', value: 'algolia' },
        ],
        when: (answers) => answers.commerce === 'commercetools',
      },
      {
        type: 'list',
        name: 'payment',
        message: 'Which payment provider are you going to use?',
        choices: [
          { name: 'None', value: false },
          { name: 'Adyen', value: 'adyen' },
        ],
        when: (answers) => answers.commerce === 'commercetools',
      },
      {
        type: 'input',
        name: 'output',
        message: 'Where would you like to put you new project directory? The default is "./" (current directory)',
        default: './',
      },
    ])
    .then(async (answer) => {
      const command = [
        'yarn vsf-tu --config cli-config.js',
        answer.cms ? `--et:cms ${answer.cms}` : '',
        answer.name ? `--et:name ${answer.name}` : '',
        answer.output ? `--et:output ${answer.output}` : '',
        answer.search ? `--et:search ${answer.search}` : '',
        answer.payment ? `--et:payment ${answer.payment}` : '',
        answer.commerce ? `--et:commerce ${answer.commerce}` : '',
        answer.extension ? `--et:extension ${answer.extension}` : '',
      ]
        .filter(Boolean) // Remove falsy elements
        .join(' ')

      const missingEnvVariables = [
        validateCommerce(answer.commerce).missingEnvVariables,
        answer.cms && validateCms(answer.cms).missingEnvVariables,
        answer.search && validateSearch(answer.search).missingEnvVariables,
      ]
        .filter(Boolean)
        .flat()

      if (missingEnvVariables.length) {
        throw {
          message: `Missing ${missingEnvVariables.length} env variables!`,
          missingEnvVariables,
        }
      }

      execSync(command, { stdio: 'inherit' })
      consola.success(`Project generated successfully!`)

      const dependencies = getDependenciesList({
        cms: answer.cms,
        commerce: answer.commerce,
        payment: answer.payment,
        search: answer.search,
      })
      console.table(
        Object.entries(dependencies).map(([package, version]) => ({
          package,
          version,
        })),
      )

      const packageJsonPath = `${answer.output}generated-${answer.name}/package.json`
      const packageJson = JSON.parse(readFileSync(packageJsonPath))
      writeFileSync(
        packageJsonPath,
        JSON.stringify(
          {
            ...packageJson,
            dependencies: {
              ...packageJson.dependencies,
              ...dependencies,
            },
          },
          null,
          2,
        ),
      )
      consola.success(`Dependencies added successfully!`)
    })
    .catch((err) => {
      consola.error(err.message)
      console.table(err.missingEnvVariables)
    })
})()
