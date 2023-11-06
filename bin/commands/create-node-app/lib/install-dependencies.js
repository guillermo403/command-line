import log from './log.js'
import colors from './utils/colors.js'
import getDependencies from './utils/dependencies.js'
import executeCommand from './utils/execute-command.js'

export default async function (appConfig) {
  log({
    text: 'Installing dependencies... ',
    color: colors.info,
    breakLine: false
  })

  process.chdir(appConfig.appName)

  const [dependencies, devDependencies] = getDependencies(appConfig)

  await executeCommand(`npm i ${dependencies}`)
  await executeCommand(`npm i -D ${devDependencies}`)

  log({
    text: '[v]',
    color: colors.success,
    breakLine: true
  })
}
