import { eslintrc, getAppContent, getIndexContent, getServerContent } from './config.js'

export const getFiles = () => {
  const { rootFolder, appName } = globalThis.appConfig
  return [
    { path: `${rootFolder}/src/app.js`, content: getAppContent() },
    { path: `${rootFolder}/index.js`, content: getIndexContent() },
    { path: `${rootFolder}/src/server.js`, content: getServerContent() },
    { path: `${rootFolder}/.gitignore`, content: 'node_modules' },
    { path: `${rootFolder}/README.md`, content: `# ${appName}` },
    { path: `${rootFolder}/_test_/app.test.js`, content: '' },
    { path: `${rootFolder}/.eslintrc.cjs`, content: `module.exports = ${JSON.stringify(eslintrc, null, 2)}` }
  ]
}
