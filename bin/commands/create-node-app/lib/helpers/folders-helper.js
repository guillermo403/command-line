import fs from 'node:fs/promises'

export default {
  create,
  exists,
  unlink
}

async function create (name) {
  if (await exists(name)) return Promise.resolve()

  return new Promise((resolve, reject) => {
    fs.mkdir(name)
      .then(resolve(name))
      .catch(reject(new Error(`Error creating folder ${name}`)))
  })
}

function exists (name) {
  return new Promise((resolve, reject) => {
    fs.access(name)
      .then(() => resolve(true))
      .catch(() => resolve(false))
  })
}

function unlink (name) {
  fs.unlinkSync(name)
}
