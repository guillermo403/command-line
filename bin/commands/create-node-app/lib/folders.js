import { join } from 'node:path'
import { checkDependency } from './utils/check-dependency.js'

export function getFolders (deps) {
  const folders = ['src', 'lib', '_test_']

  if (checkDependency(deps, 'express')) {
    folders.push(
      join('src', 'routes'),
      join('src', 'controllers')
    )
  }

  return folders
}
