import { join } from 'node:path'

export function getFolders (deps) {
  const folders = ['src', 'lib', '_test_']

  if (deps.express) {
    folders.push(
      join('src', 'routes'),
      join('src', 'controllers')
    )
  }

  return folders
}
