import fs from 'node:fs'

export default {
  create,
  exists,
  unlink
}

function create (name) {
  if (fs.existsSync(name)) return

  fs.mkdirSync(name)
}

function exists (name) {
  return fs.existsSync(name)
}

function unlink (name) {
  fs.unlinkSync(name)
}
