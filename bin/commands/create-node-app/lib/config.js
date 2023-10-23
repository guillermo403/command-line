import fs from 'node:fs'
import { join } from 'node:path'

export const getPackageJson = (packageName) => ({
  name: packageName,
  version: '1.0.0',
  description: '',
  main: 'index.js',
  type: 'module',
  scripts: {
    dev: 'node --watch index.js',
    lint: 'standard --fix',
    test: 'echo "Error: no test specified" && exit 1'
  },
  keywords: [],
  author: 'Guillermo Merino',
  license: 'ISC'
})

const templatesPath = join(import.meta.url, '..', '..', 'templates').replace('file:', '')

export const getIndexContent = () => fs.readFileSync(`${join(templatesPath, 'index.txt')}`, 'utf8')

export function getAppContent () {
  const { appConfig } = globalThis

  let content = ''
  if (appConfig.express) {
    content += "import * as server from './server.js'\n"
  }

  content += '\n'
  content += 'export function init () {'

  if (appConfig.express) {
    content += '\n  server.start()'
    // eslint-disable-next-line no-template-curly-in-string
    content += '\n    .then(port => console.log(`Server running on http://localhost:${port}`))'
  }

  content += '}'
  return content
}

export function getRoutesContent () {
  let content = ''
  content += "import { Router } from 'express'\n"
  content += '\n'
  content += 'const router = Router()\n'
  content += '\n'
  content += "router.get('/', (req, res) => {\n"
  content += "  res.json({ message: 'Hello world!' })\n"
  content += '})\n'
  content += '\n'
  content += 'export default router'
  return content
}

export const getServerContent = () => fs.readFileSync(`${join(templatesPath, 'server.txt')}`, 'utf8')

export const eslintrc = {
  extends: 'standard'
}
