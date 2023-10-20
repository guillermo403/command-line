#!/usr/bin/env node

import { promisify } from 'node:util'
import { exec } from 'node:child_process'
import { join } from 'node:path'
import { createFolderIfNotExists } from './lib/create-folder.js'
import { createFileIfNotExist } from './lib/create-file.js'
import { eslintrc, getAppContent, getIndexContent } from './lib/config.js'
import { updatePackageJson } from './lib/update-package-json.js'
import { clearAllIntervals, createInterval } from './lib/utils/interval.js'
import { log } from './lib/utils/log.js'
import { info, orange } from './lib/utils/colors.js'

const execAsync = promisify(exec)

const packageName = process.argv
  .slice(2)
  .join(' ')
  .toLowerCase()
  .replace(/ /g, '-') ?? 'node-app'

createFolderIfNotExists(packageName)
const rootFolder = join(process.cwd(), packageName)
globalThis.rootFolder = rootFolder

process.chdir(rootFolder)

const folders = ['src', 'lib', '_test_']
const files = [
  { path: `${rootFolder}/src/app.js`, content: getAppContent() },
  { path: `${rootFolder}/index.js`, content: getIndexContent() },
  { path: `${rootFolder}/.gitignore`, content: 'node_modules' },
  { path: `${rootFolder}/README.md`, content: `# ${packageName}` },
  { path: `${rootFolder}/_test_/app.test.js`, content: '' },
  { path: `${rootFolder}/.eslintrc.cjs`, content: `module.exports = ${JSON.stringify(eslintrc, null, 2)}` }
]
const dotsInterval = createInterval()

log('Installing dependencies')
dotsInterval.start()

const dependenciesScriptPath = join(import.meta.url, '..', '..', '..', '..', 'dependencies.sh').replace('file:', '')

execAsync('npm init -y')
  .then(() => execAsync(`bash ${dependenciesScriptPath}`))
  .then(() => updatePackageJson(packageName))
  .then(() => {
    dotsInterval.stop()
    log(' ✅\n')
    log('Creating project structure...')
    dotsInterval.start()

    for (const folder of folders) {
      createFolderIfNotExists(`${rootFolder}/${folder}`)
    }

    for (const file of files) {
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
