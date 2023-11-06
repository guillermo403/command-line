import log from '../log.js'
import colors from './colors.js'
import executeCommand from './execute-command.js'

export default async function (appConfig) {
  if (!appConfig.git) return

  log({
    text: 'Initializing git repository... ',
    color: colors.info,
    breakLine: false
  })
  await executeCommand('git init')
  log({
    text: '[v]',
    color: colors.success,
    breakLine: true
  })
}
