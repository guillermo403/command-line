import fs from 'node:fs'

export const createFolderIfNotExists = (path) => {
  if (fs.existsSync(path)) return

  fs.mkdirSync(path)
}
