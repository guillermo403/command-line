import { promisify } from 'node:util'
import { log } from './utils/log.js'
import { createInterval } from './utils/interval.js'
import { exec } from 'node:child_process'
import { updatePackageJson } from './update-package-json.js'
const execAsync = promisify(exec)

export function installDependencies () {
  const dotsInterval = createInterval()

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
