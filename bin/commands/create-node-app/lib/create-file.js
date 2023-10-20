import fs from 'node:fs'

export const createFileIfNotExist = (path, content) => {
  if (fs.existsSync(path)) return

  fs.writeFileSync(path, content)
}
