import inquirer from 'inquirer'
import foldersHelper from '../helpers/folders-helper.js'

export default async function (appConfig) {
  const options = getOptions(appConfig.appName)

  const answers = await inquirer.prompt(options)
  return answers
}

function getOptions (appName) {
  const options = [
    {
      type: 'confirm',
      name: 'express',
      message: 'Would you like to use express?',
      default: true
    }
  ]

  options.push({
    type: 'confirm',
    name: 'typescript',
    message: 'Would you like to use typescript?',
    default: false
  })

  options.push({
    type: 'confirm',
    name: 'eslint',
    message: 'Would you like to use eslint to enforce code style?',
    default: true
  })

  options.push({
    type: 'confirm',
    name: 'prettier',
    message: 'Would you like to use prettier to format your code?',
    default: true
  })

  options.push({
    type: 'confirm',
    name: 'git',
    message: 'Would you like to initialize a git repository?',
    default: true
  })

  if (appName === '') {
    options.unshift({
      type: 'input',
      name: 'appName',
      message: 'Name of the project:',
      default: 'node-app',
      filter: input => input.trim().replace(/\s+/g, '-'),
      validate (input) {
        if (input.trim() === '') {
          return 'Please enter a valid name for the project'
        }

        if (foldersHelper.exists(input)) {
          return 'A folder with the same name already exists and is not empty'
        }
        return true
      }
    })
  }

  return options
}
