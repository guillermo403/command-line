import { log } from './utils/log.js'
import { createInterval } from './utils/interval.js'
import { updatePackageJson } from './update-package-json.js'
import { execute } from './utils/execute-command.js'
import { getDependencies } from './utils/get-dependencies.js'
import { hasTypescript } from './utils/has-typescript.js'

export function installDependencies () {
  const dotsInterval = createInterval()
  log('Installing dependencies')
  dotsInterval.start()

  const dependencies = getDependencies()

  // Default dependencies
  if (hasTypescript()) dependencies.push(['ts-standard'])
  else dependencies.push(['standard'])
  //

  const depsCommand = `npm install ${dependencies.join(' ')}`
  const devDepsCommand = `npm install -D ${globalThis.appConfig.devDependencies.join(' ')}`

  return execute(depsCommand)
    .then(() => execute(devDepsCommand))
    .then(() => initTypescript())
    .then(() => updatePackageJson())
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

function initTypescript () {
  return hasTypescript()
    ? execute('npx tsc --init')
    : Promise.resolve()
}
