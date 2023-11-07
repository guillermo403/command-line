import { join } from 'node:path'

export default function (appConfig) {
  const src = join('src')

  const folders = [
    src,
    join(src, 'lib')
  ]

  if (appConfig.express) {
    folders.push(join(src, 'routes'))
    folders.push(join(src, 'middlewares'))
    folders.push(join(src, 'controllers'))
  }

  if (appConfig.typescript) {
    folders.push(join(src, 'types'))
  }

  return folders
}
