import log from './log.js'
import colors from './utils/colors.js'
import getDependencies from './utils/dependencies.js'
import executeCommand from './utils/execute-command.js'

export default async function (appConfig) {
  const loading = log({
    text: 'Installing dependencies',
    color: colors.info,
    breakLine: false,
    loading: true,
    hideCursor: true
  })

  const [dependencies, devDependencies] = getDependencies(appConfig)

  await executeCommand({ command: `npm i ${dependencies}` })
  await executeCommand({ command: `npm i -D ${devDependencies}` })

  log({
    text: '[v]',
    color: colors.success,
    breakLine: true
  })
  loading.stop()
}
