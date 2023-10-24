import { checkDependency } from './utils/check-dependency.js'

export const getIndexContent = () => {
  let content = ''
  content += "import { init } from './src/app.js'\n\n"
  content += 'init()'
  return content
}

export function getAppContent (deps) {
  let content = ''
  if (checkDependency(deps, 'express')) {
    content += "import * as server from './server.js'\n"
    content += '\n'
    content += 'export function init (): void {'
  } else content += 'export function init () {'

  if (checkDependency(deps, 'express')) {
    content += '\n  server.start()'
    // eslint-disable-next-line no-template-curly-in-string
    content += '\n    .then(port => console.log(`Server running on http://localhost:${port}`))'
    content += '\n    .catch(err => console.error(err))'
  }

  content += '}'
  return content
}

export function getRoutesContent (deps) {
  let content = ''

  if (checkDependency(deps, 'typescript')) {
    content += "import { Router, Request, Response } from 'express'\n"
  } else {
    content += "import { Router } from 'express'\n"
  }

  content += '\n'
  content += 'const router = Router()\n'
  content += '\n'

  if (checkDependency(deps, 'typescript')) {
    content += "router.get('/', (req: Request, res: Response) => {\n"
  } else {
    content += "router.get('/', (req, res) => {\n"
  }
  content += "  res.json({ message: 'Hello world!' })\n"
  content += '})\n'
  content += '\n'
  content += 'export default router'
  return content
}

export const getServerContent = (deps) => {
  let content = ''

  content += "import express, { json } from 'express'\n"
  content += "import router from './routes/index.js'\n"
  content += 'const app = express()\n'
  content += 'const PORT = process.env.PORT ?? 3000\n'
  content += '\n'
  if (checkDependency(deps, 'typescript')) content += 'export const start = async (): Promise<number> => {\n'
  else content += 'export const start = async () => {\n'
  content += '  return new Promise(resolve => {\n'
  content += '    app.use(json())\n'
  content += '    app.use(\'/\', router)\n'
  content += '\n'
  content += '    app.listen(PORT, () => resolve(PORT))\n'
  content += '  })\n'
  content += '}'

  return content
}

export const getEslintrc = (deps) => {
  const settings = {
    extends: 'standard'
  }

  if (checkDependency(deps, 'typescript')) {
    settings.project = './tsconfig.json'
  }

  return settings
}
