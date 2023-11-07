import fs from 'node:fs/promises'

export default {
  create,
  exists,
  unlink,
  read
}

async function create (name, content = '') {
  if (await exists(name)) return

  return new Promise((resolve, reject) => {
    fs.writeFile(name, content)
      .then(resolve(name))
      .catch(reject(new Error(`Error creating file ${name}`)))
  })
}

function exists (name) {
  return new Promise((resolve, reject) => {
    fs.access(name)
      .then(() => resolve(true))
      .catch(() => resolve(false))
  })
}

function read (name) {
  return new Promise((resolve, reject) => {
    fs.readFile(name, 'utf8')
      .then(resolve)
      .catch((err) => {
        reject(new Error(`Error reading file ${name} => `, err))
      })
  })
}

function unlink (name) {
  fs.unlinkSync(name)
}
