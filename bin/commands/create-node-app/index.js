#!/usr/bin/env node
// Node version used to create this script: v18.0.0

import { join } from 'node:path'
import { createFolderIfNotExists } from './lib/create-folder.js'
import { installDependencies } from './lib/install-dependencies.js'
import { createStructure } from './lib/create-application-structure.js'
import { clearAllIntervals } from './lib/utils/interval.js'
import { log } from './lib/utils/log.js'
import { info, orange, success } from './lib/utils/colors.js'
import boxen from 'boxen'
import { boxenOptions } from './lib/utils/boxen.js'
import { getUserConfig } from './lib/application-config.js'
import { execute } from './lib/utils/execute-command.js'

let appConfig

clearConsole()
  .then(() => getUserConfig())
  .then((config) => {
    appConfig = config
    createFolderIfNotExists(appConfig.app_name)
    appConfig.rootDir = join(process.cwd(), appConfig.app_name)
    process.chdir(appConfig.rootDir)
    return clearConsole()
  })
  .then(() => initializeApp())
  .then(() => installDependencies(appConfig))
  .then(() => createStructure(appConfig))
  .then(() => initializeGit())
  .then(() => {
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

function initializeApp () { return execute('npm init -y') }
function initializeGit () {
  if (appConfig.git) {
    return execute('git init')
      .then(() => log(orange('Git repository initialized\n\n')))
  }

  return Promise.resolve()
}
function clearConsole () { console.clear(); return Promise.resolve() }
