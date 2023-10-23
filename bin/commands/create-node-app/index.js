#!/usr/bin/env node
// Node version used to create this script: v18.0.0

import { promisify } from 'node:util'
import { exec } from 'node:child_process'
import { join } from 'node:path'
import { createFolderIfNotExists } from './lib/create-folder.js'
import { installDependencies } from './lib/install-dependencies.js'
import { createStructure } from './lib/create-application-structure.js'
import { clearAllIntervals } from './lib/utils/interval.js'
import { log } from './lib/utils/log.js'
import { info, orange, success } from './lib/utils/colors.js'
import boxen from 'boxen'
import { boxenOptions } from './lib/utils/boxen.js'
import { askConfig } from './lib/application-config.js'

// Promisify the exec function for use with async/await instead of callbacks
const execAsync = promisify(exec)

// Clear the console
console.clear()

// Ask the user for the application configuration
const appConfig = await askConfig.apply({})

// Get the package name from the command line arguments or use "node-app" as default
const appName = appConfig.app_name.trim() !== ''
  ? appConfig.app_name
    .trim()
    .toLowerCase()
    .replace(/ /g, '-')
  : 'node-app'
appConfig.app_name = appName

// Create the root folder
createFolderIfNotExists(appName)
const rootFolder = join(process.cwd(), appName)
appConfig.rootFolder = rootFolder

// Make the appConfig object available globally
globalThis.appConfig = appConfig

// Change the current working directory to the project folder
process.chdir(rootFolder)

installDependencies()
  .then(() => createStructure())
  .then(() => execAsync('git init'))
  .then(() => {
    log(orange('Git repository initialized\n\n'))

    let message = `${info('To start the application run:\n\n')}`
    message += ` ${success(`- cd ${appConfig.app_name}`)}\n`
    message += ` ${success('- npm run lint')}\n`
    message += ` ${success('- npm run dev')}`
    log(boxen(message, boxenOptions))
  })
  .catch((err) => console.log(err))
  .finally(() => {
    clearAllIntervals()
    process.exit(0)
  })
