import readline from 'node:readline/promises'

// eslint-disable-next-line space-before-function-paren
export async function getUserConfig() {
  const { stdin: input, stdout: output } = process
  const rl = readline.createInterface({ input, output })

  const appConfig = { deps: {}, devDeps: {} }

  // APP NAME
  const appName = process.argv[2] ?? await rl.question('Project name: ')
  appConfig.name = appName.trim() !== ''
    ? appName
      .trim()
      .toLowerCase()
      .replace(/ /g, '-')
    : 'node-app'

  // EXPRESS
  const express = await rl.question('Would you like to install express? (y/N) ')
  appConfig.deps.express = !!(express === 'y' || express === 'Y')

  // TYPESCRIPT
  const typescript = await rl.question('Would you like to use typescript? (y/N) ')
  if (typescript === 'y' || typescript === 'Y') {
    appConfig.deps.tsx = true
    appConfig.deps.typescript = true
    if (appConfig.deps.express) {
      appConfig.devDeps['@types/express'] = true
    }
  }

  return Promise.resolve(appConfig)
}
