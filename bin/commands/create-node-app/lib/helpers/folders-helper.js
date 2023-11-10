import fs from 'node:fs/promises'

export default {
  create,
  exists,
  unlink
}

async function create (name) {
  if (await exists(name)) return

  return fs.mkdir(name)
    .then(() => name)
    .catch(() => new Error(`Error creating folder ${name}`))
}

async function exists (name) {
  return fs.access(name)
    .then(() => true)
    .catch(() => false)
}

function unlink (name) {
  fs.unlinkSync(name)
}
