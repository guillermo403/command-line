import boxen from 'boxen'
import colors from './colors.js'
import log from '../log.js'

export default function (appConfig) {
  let endMessage = `${colors.success('Node app')} ${colors.nocolor.bold(appConfig.appName)} ${colors.success('created successfully!')}`
  endMessage += '\n\n'
  endMessage += colors.pink('To start the app, run:')
  endMessage += '\n'
  endMessage += '  cd ' + appConfig.appName + '\n'
  endMessage += '  npm run dev'
  endMessage += '\n\n'
  endMessage += colors.orange('Happy coding!')
  const box = boxen(endMessage, {
    margin: 1,
    padding: 1,
    borderStyle: 'round',
    borderColor: 'green'
  })

  log({
    text: box,
    color: colors.info,
    breakLine: true
  })
}
