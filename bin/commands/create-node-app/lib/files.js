import {
  getAppContent,
  getIndexContent,
  getServerContent,
  getRoutesContent,
  getEslintrc
} from './templates.js'

import { join } from 'node:path'
import { checkDependency } from './utils/check-dependency.js'
import { hasTypescript } from './utils/has-typescript.js'

export const getFiles = () => {
  const { rootDir, app_name: appName } = globalThis.appConfig

  const files = [
    { path: 'index.js', content: getIndexContent() },
    { path: join('src', 'app.js'), content: getAppContent() },
    { path: '.gitignore', content: 'node_modules' },
    { path: 'README.md', content: `# ${appName}` },
    { path: join('_test_', 'app.test.js'), content: '' },
    { path: '.eslintrc.cjs', content: `module.exports = ${JSON.stringify(getEslintrc(), null, 2)}` }
  ]

  if (checkDependency('express')) {
    files.push({ path: join('src', 'server.js'), content: getServerContent() })
    files.push({ path: join('src', 'routes', 'index.js'), content: getRoutesContent() })
  }

  files.map(({ path }) => join(rootDir, path))

  if (hasTypescript()) {
    files
      .filter(({ path }) => path.endsWith('.js'))
      .map((file) => {
        file.path = file.path.replace('.js', '.ts')
        return file
      })
  }

  return files
}
