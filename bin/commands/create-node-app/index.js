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
import { info, orange } from './lib/utils/colors.js'
import { folders } from './lib/folders.js'
import { getFiles } from './lib/files.js'

// Promisify the exec function for use with async/await instead of callbacks
const execAsync = promisify(exec)

// Get the package name from the command line arguments or use "node-app" as default
const packageName = process.argv
  .slice(2)
  .join(' ')
  .toLowerCase()
  .replace(/ /g, '-') ?? 'node-app'

createFolderIfNotExists(packageName)
const rootFolder = join(process.cwd(), packageName)
globalThis.rootFolder = rootFolder
globalThis.packageName = packageName

// Change the current working directory to the project folder
process.chdir(rootFolder)

// Create a new interval to show dots every 700ms
const dotsInterval = createInterval()

log('Installing dependencies')
dotsInterval.start()

// Get the path to the dependencies.sh script
const dependenciesScriptPath = join(import.meta.url, '..', 'dependencies.sh').replace('file:', '')

execAsync('npm init -y')
  .then(() => execAsync(`bash ${dependenciesScriptPath}`))
  .then(() => updatePackageJson(packageName))
  .then(() => {
    dotsInterval.stop()
    log(' ✅\n')
    log('Creating project structure...')
    dotsInterval.start()

    // Create the folders
    for (const folder of folders) {
      createFolderIfNotExists(`${rootFolder}/${folder}`)
    }

    // Create the files
    for (const file of getFiles()) {
      createFileIfNotExist(file.path, file.content)
    }

    return Promise.resolve()
  })
  .then(() => execAsync('npm run lint'))
  .then(() => execAsync('git init'))
  .then(() => {
    dotsInterval.stop()
    log(' ✅\n\n')

    log(orange('Git repository initialized\n\n'))

    log(info('To start the project run "npm run dev"'))
  })
  .catch((err) => console.log(err))
  .finally(() => {
    clearAllIntervals()
    process.exit(0)
  })
