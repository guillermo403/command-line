import {
  eslintrc,
  getAppContent,
  getIndexContent,
  getServerContent,
  getRoutesContent
} from './config.js'

import { join } from 'node:path'

export const getFiles = () => {
  const { rootFolder, app_name: appName } = globalThis.appConfig

  const src = join(rootFolder, 'src')

  const files = [
    { path: join(rootFolder, 'index.js'), content: getIndexContent() },
    { path: join(src, 'app.js'), content: getAppContent() },
    { path: join(rootFolder, '.gitignore'), content: 'node_modules' },
    { path: join(rootFolder, 'README.md'), content: `# ${appName}` },
    { path: join(rootFolder, '_test_', 'app.test.js'), content: '' },
    { path: join(rootFolder, '.eslintrc.cjs'), content: `module.exports = ${JSON.stringify(eslintrc, null, 2)}` }
  ]

  if (globalThis.appConfig.express) {
    files.push({ path: join(src, 'server.js'), content: getServerContent() })
    files.push({ path: join(src, 'routes', 'index.js'), content: getRoutesContent() })
  }

  return files
}
