import readline from 'node:readline/promises'

// eslint-disable-next-line space-before-function-paren
export async function askConfig() {
  const { stdin: input, stdout: output } = process

  const rl = readline.createInterface({ input, output })

  const appName = await rl.question('Project name: ')
  this.app_name = appName

  const express = await rl.question('Would you like to install express? (y/n) ')
  this.express = !!(express === 'y' || express === 'Y')

  return this
}
