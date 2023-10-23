import fs from 'node:fs'
import { join } from 'node:path'

const templatesPath = join(import.meta.url, '..', '..', 'templates').replace('file:', '')

export const getIndexContent = () => fs.readFileSync(`${join(templatesPath, 'index.txt')}`, 'utf8')

export function getAppContent (deps) {
  let content = ''
  if (deps.express) {
    content += "import * as server from './server.js'\n"
  }

  content += '\n'
  content += 'export function init () {'

  if (deps.express) {
    content += '\n  server.start()'
    // eslint-disable-next-line no-template-curly-in-string
    content += '\n    .then(port => console.log(`Server running on http://localhost:${port}`))'
  }

  content += '}'
  return content
}

export function getRoutesContent (deps) {
  let content = ''

  if (deps.typescript) {
    content += "import { Router, Request, Response } from 'express'\n"
  } else {
    content += "import { Router } from 'express'\n"
  }

  content += '\n'
  content += 'const router = Router()\n'
  content += '\n'

  if (deps.typescript) {
    content += "router.get('/', (req: Request, res: Response) => {\n"
  } else {
    content += "router.get('/', (req, res) => {\n"
  }
  content += "  res.json({ message: 'Hello world!' })\n"
  content += '})\n'
  content += '\n'
  content += 'export default router'
  return content
}

export const getServerContent = () => fs.readFileSync(`${join(templatesPath, 'server.txt')}`, 'utf8')

export const getEslintrc = (deps) => {
  const settings = {
    extends: 'standard'
  }

  if (deps.typescript) {
    settings.project = './tsconfig.json'
  }

  return settings
}
