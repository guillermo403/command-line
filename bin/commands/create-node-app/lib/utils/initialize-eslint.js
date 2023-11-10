import log from '../log.js'
import colors from './colors.js'
import executeCommand from './execute-command.js'

export default function (appConfig) {
  if (!appConfig.eslint) return Promise.resolve()

  const loading = log({
    text: 'Initializing eslint',
    color: colors.info,
    hideCursor: true,
    loading: true
  })
  const command = `yes | npm init @eslint/config -- --config standard${appConfig.typescript ? '-with-typescript' : ''}`
  return executeCommand({ command })
    .then(() => {
      log({ text: '[v]', color: colors.success, breakLine: true })
      loading.stop()
    })
    .catch(console.error)
}
