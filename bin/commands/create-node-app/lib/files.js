import { eslintrc, getAppContent, getIndexContent } from './config.js'

export const getFiles = () => {
  const { rootFolder, packageName } = globalThis
  return [
    { path: `${rootFolder}/src/app.js`, content: getAppContent() },
    { path: `${rootFolder}/index.js`, content: getIndexContent() },
    { path: `${rootFolder}/.gitignore`, content: 'node_modules' },
    { path: `${rootFolder}/README.md`, content: `# ${packageName}` },
    { path: `${rootFolder}/_test_/app.test.js`, content: '' },
    { path: `${rootFolder}/.eslintrc.cjs`, content: `module.exports = ${JSON.stringify(eslintrc, null, 2)}` }
  ]
}
