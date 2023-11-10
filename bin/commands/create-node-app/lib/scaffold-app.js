import foldersHelper from './helpers/folders-helper.js'
import filesHelper from './helpers/files-helper.js'
import log from './log.js'
import colors from './utils/colors.js'
import getApplicationFiles from './utils/app-files.js'
import getApplicationFolders from './utils/app-folders.js'

export default async function (appConfig) {
  const loading = log({
    text: 'Scaffolding app',
    color: colors.info,
    breakLine: false,
    loading: true,
    hideCursor: true
  })

  const { create: createFolder } = foldersHelper
  const { create: createFile } = filesHelper

  const folders = getApplicationFolders(appConfig)
  for (const folder of folders) {
    await createFolder(folder)
  }

  const files = getApplicationFiles(appConfig)
  for (const file of files) {
    const { path, extension, template, replace, content } = file
    let filePath = `${path}`
    if (extension) filePath += `.${extension}`

    let fileContent = ''
    if (content) fileContent = content
    else if (template) fileContent = await filesHelper.read(template)
    if (replace) {
      for (const key in replace) {
        const regex = new RegExp(key, 'g')
        fileContent = fileContent.replace(regex, replace[key])
      }
    }

    await createFile(filePath, fileContent)
  }

  log({
    text: '[v]',
    color: colors.success,
    breakLine: true
  })
  loading.stop()
  return Promise.resolve({ folders, files })
}
