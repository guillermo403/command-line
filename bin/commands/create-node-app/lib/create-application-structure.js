import { log } from './utils/log.js'
import { createInterval } from './utils/interval.js'
import { createFileIfNotExist } from './create-file.js'
import { createFolderIfNotExists } from './create-folder.js'
import { getFiles } from './files.js'
import { getFolders } from './folders.js'

export function createStructure () {
  const { appConfig } = globalThis

  const dotsInterval = createInterval()

  log('Creating project structure...')
  dotsInterval.start()

  // Create the folders
  for (const folder of getFolders()) {
    createFolderIfNotExists(`${appConfig.rootFolder}/${folder}`)
  }

  // Create the files
  for (const file of getFiles()) {
    createFileIfNotExist(file.path, file.content)
  }

  log(' ✅\n\n')
  dotsInterval.stop()

  return Promise.resolve()
}
