import {
  eslintrc,
  getAppContent,
  getIndexContent,
  getServerContent,
  getRoutesContent
} from './config.js'

import { join } from 'node:path'

export const getFiles = ({ rootDir, name: appName, deps }) => {
  const files = [
    { path: 'index.js', content: getIndexContent() },
    { path: join('src', 'app.js'), content: getAppContent(deps) },
    { path: '.gitignore', content: 'node_modules' },
    { path: 'README.md', content: `# ${appName}` },
    { path: join('_test_', 'app.test.js'), content: '' },
    { path: '.eslintrc.cjs', content: `module.exports = ${JSON.stringify(eslintrc, null, 2)}` }
  ]

  if (deps.express) {
    files.push({ path: join('src', 'server.js'), content: getServerContent() })
    files.push({ path: join('src', 'routes', 'index.js'), content: getRoutesContent(deps) })
  }

  files.map(({ path }) => join(rootDir, path))

  if (deps.typescript) {
    files
      .filter(({ path }) => path.endsWith('.js'))
      .map((file) => {
        file.path = file.path.replace('.js', '.ts')
        return file
      })
  }

  return files
}
