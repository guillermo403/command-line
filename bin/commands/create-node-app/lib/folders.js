import { join } from 'node:path'
import { checkDependency } from './utils/check-dependency.js'

export function getFolders () {
  const folders = ['src', 'lib', '_test_']

  if (checkDependency('express')) {
    folders.push(
      join('src', 'routes'),
      join('src', 'controllers')
    )
  }

  return folders
}
