import {
  getAppContent,
  getIndexContent,
  getServerContent,
  getRoutesContent,
  getEslintrc
} from './fillFiles.js'

import { join } from 'node:path'
import { checkDependency } from './utils/check-dependency.js'

export const getFiles = ({ rootDir, name: appName, deps }) => {
  const files = [
    { path: 'index.js', content: getIndexContent() },
    { path: join('src', 'app.js'), content: getAppContent(deps) },
    { path: '.gitignore', content: 'node_modules' },
    { path: 'README.md', content: `# ${appName}` },
    { path: join('_test_', 'app.test.js'), content: '' },
    { path: '.eslintrc.cjs', content: `module.exports = ${JSON.stringify(getEslintrc(deps), null, 2)}` }
  ]

  if (checkDependency(deps, 'express')) {
    files.push({ path: join('src', 'server.js'), content: getServerContent(deps) })
    files.push({ path: join('src', 'routes', 'index.js'), content: getRoutesContent(deps) })
  }

  files.map(({ path }) => join(rootDir, path))

  if (checkDependency(deps, 'typescript')) {
    files
      .filter(({ path }) => path.endsWith('.js'))
      .map((file) => {
        file.path = file.path.replace('.js', '.ts')
        return file
      })
  }

  return files
}
