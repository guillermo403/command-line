import executeCommand from './execute-command.js'

export default function (appConfig) {
  if (!appConfig.eslint) return Promise.resolve()

  return executeCommand('npm init @eslint/config')
}
