#!/usr/bin/env node
// Node version used to create this script: v18.0.0

import { promisify } from 'node:util'
import { exec } from 'node:child_process'
import { join } from 'node:path'
import { createFolderIfNotExists } from './lib/create-folder.js'
import { createFileIfNotExist } from './lib/create-file.js'
import { updatePackageJson } from './lib/update-package-json.js'
import { clearAllIntervals, createInterval } from './lib/utils/interval.js'
import { log } from './lib/utils/log.js'
import { info, orange, success } from './lib/utils/colors.js'
import { folders } from './lib/folders.js'
import { getFiles } from './lib/files.js'
import boxen from 'boxen'
import { boxenOptions } from './lib/utils/boxen.js'
import { askConfig } from './lib/application-config.js'

// Promisify the exec function for use with async/await instead of callbacks
const execAsync = promisify(exec)

// Clear the console
console.clear()

function installDependencies () {
  return new Promise((resolve, reject) => {
    log('Installing dependencies')
    dotsInterval.start()

    const deps = ['standard']

    if (globalThis.appConfig.express) deps.push('express')

    const command = `npm install -D ${deps.join(' ')}`
    execAsync('npm init -y')
      .then(() => execAsync(command))
      .then(() => updatePackageJson())
      .catch(() => {
        log('❌ Something gone wrong\n')
        process.exit(1)
      })
      .finally(() => {
        log(' ✅\n')
        dotsInterval.stop()
        resolve()
      })
  })
}

function createStructure () {
  log('Creating project structure...')
  dotsInterval.start()

  // Create the folders
  for (const folder of folders) {
    createFolderIfNotExists(`${appConfig.rootFolder}/${folder}`)
  }

  // Create the files
  for (const file of getFiles()) {
    createFileIfNotExist(file.path, file.content)
  }

  log(' ✅\n\n')
  dotsInterval.stop()

  return Promise.resolve()
}

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

// Create a new interval to show dots every 700ms
const dotsInterval = createInterval()

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
