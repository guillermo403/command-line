import log from '../log.js'
import colors from './colors.js'
import executeCommand from './execute-command.js'

export default async function (appConfig) {
  if (!appConfig.git) return

  const loading = log({
    text: 'Initializing git repository... ',
    color: colors.info,
    breakLine: false,
    loading: true,
    hideCursor: true
  })
  return executeCommand({ command: 'git init' })
    .then(() => {
      loading.stop()
      log({
        text: '[v]',
        color: colors.success,
        breakLine: true
      })
    })
    .catch(console.error)
}
