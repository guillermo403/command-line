import { join } from 'node:path'

export function getFolders () {
  const folders = ['src', 'lib', '_test_']

  if (globalThis.appConfig.express) {
    folders.push(
      join('src', 'routes'),
      join('src', 'controllers')
    )
  }

  return folders
}
