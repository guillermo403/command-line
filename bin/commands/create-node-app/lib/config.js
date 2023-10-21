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
export const getAppContent = () => fs.readFileSync(`${join(templatesPath, 'app.txt')}`, 'utf8')
export const getServerContent = () => fs.readFileSync(`${join(templatesPath, 'server.txt')}`, 'utf8')

export const eslintrc = {
  extends: 'standard'
}
