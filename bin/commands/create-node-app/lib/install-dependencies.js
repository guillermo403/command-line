import { log } from './utils/log.js'
import { createInterval } from './utils/interval.js'
import { updatePackageJson } from './update-package-json.js'
import { execute } from './utils/execute-command.js'

export function installDependencies (appConfig) {
  const dotsInterval = createInterval()

  return new Promise((resolve, reject) => {
    log('Installing dependencies')
    dotsInterval.start()

    const userDependencies = Object.entries(appConfig.deps)
      .filter(([, value]) => Boolean(value))
      .map(([key]) => key)

    const dependencies = ['standard', ...userDependencies]
    const devDependencies = Object.entries(appConfig.devDeps)
      .filter(([, value]) => Boolean(value))
      .map(([key]) => key)

    const depsCommand = `npm install ${dependencies.join(' ')}`
    const devDepsCommand = `npm install -D ${devDependencies.join(' ')}`

    execute(depsCommand)
      .then(() => execute(devDepsCommand))
      .then(() => checkTypescript(appConfig.deps))
      .then(() => updatePackageJson(appConfig.name, dependencies))
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

function checkTypescript (deps) {
  return deps.typescript
    ? execute('npx tsc --init')
    : Promise.resolve()
}
