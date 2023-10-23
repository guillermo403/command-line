import { log } from './utils/log.js'
import { createInterval } from './utils/interval.js'
import { createFileIfNotExist } from './create-file.js'
import { createFolderIfNotExists } from './create-folder.js'
import { getFiles } from './files.js'
import { getFolders } from './folders.js'

export function createStructure ({ rootDir, deps, name }) {
  const dotsInterval = createInterval()

  log('Creating project structure...')
  dotsInterval.start()

  // Create the folders
  for (const folder of getFolders(deps)) {
    createFolderIfNotExists(`${rootDir}/${folder}`)
  }

  // Create the files
  for (const file of getFiles({ rootDir, deps, name })) {
    createFileIfNotExist(file.path, file.content)
  }

  log(' ✅\n\n')
  dotsInterval.stop()

  return Promise.resolve()
}
