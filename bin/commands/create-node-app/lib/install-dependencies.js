import { log } from './utils/log.js'
import { createInterval } from './utils/interval.js'
import { updatePackageJson } from './update-package-json.js'
import { execute } from './utils/execute-command.js'
import { checkDependency } from './utils/check-dependency.js'

export function installDependencies (appConfig) {
  const dotsInterval = createInterval()
  log('Installing dependencies')
  dotsInterval.start()

  const dependencies = [...appConfig.deps]

  // Default dependencies
  if (checkDependency(dependencies, 'typescript')) dependencies.push(['ts-standard'])
  else dependencies.push(['standard'])
  //

  const depsCommand = `npm install ${dependencies.join(' ')}`
  const devDepsCommand = `npm install -D ${appConfig.devDeps.join(' ')}`

  return execute(depsCommand)
    .then(() => execute(devDepsCommand))
    .then(() => initTypescript(appConfig.deps))
    .then(() => updatePackageJson(appConfig.app_name, dependencies))
    .catch((err) => {
      console.error(err)
      log('❌ Something gone wrong\n')
      process.exit(1)
    })
    .finally(() => {
      log(' ✅\n')
      dotsInterval.stop()
    })
}

function initTypescript (deps) {
  return checkDependency(deps, 'typescript')
    ? execute('npx tsc --init')
    : Promise.resolve()
}
