import fs from 'node:fs'

export default {
  create,
  exists,
  unlink,
  read
}

function create (name, content) {
  if (fs.existsSync(name)) return

  fs.writeFileSync(name, content)
}

function exists (name) {
  return fs.existsSync(name)
}

function read (name) {
  const content = fs.readFileSync(name, 'utf8')
  return content
}

function unlink (name) {
  fs.unlinkSync(name)
}
