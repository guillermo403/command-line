import { join } from 'node:path'

export default function (appConfig) {
  const src = 'src'
  const templatesPath = join(import.meta.url.replace(/file:/, ''), '..', '..', 'templates')

  const files = [
    {
      name: 'index',
      path: join(src, 'index'),
      extension: 'js',
      template: `${templatesPath}/index.txt`
    },
    {
      name: 'package',
      path: join('package'),
      extension: 'json',
      template: `${templatesPath}/package.txt`
    },
    {
      name: 'gitignore',
      path: '.gitignore',
      content: 'node_modules\nbuild'
    },
    {
      name: 'readme',
      path: 'README',
      extension: 'md',
      content: `# ${appConfig.appName}\n`
    }
  ]

  if (appConfig.express) {
    files.push(
      {
        name: 'server',
        path: join(src, 'server'),
        extension: 'js',
        template: `${templatesPath}/server.txt`
      },
      {
        name: 'routes',
        path: join(src, 'routes', 'helloWorld'),
        extension: 'js',
        template: `${templatesPath}/routes.txt`
      },
      {
        name: 'middlewares',
        path: join(src, 'middlewares', 'index'),
        extension: 'js',
        template: `${templatesPath}/middlewares.txt`
      },
      {
        name: 'controllers',
        path: join(src, 'controllers', 'helloWorld'),
        extension: 'js',
        template: `${templatesPath}/controllers.txt`
      }
    )
  }

  if (appConfig.typescript) {
    files.push({
      name: 'tsconfig',
      path: join('tsconfig'),
      extension: 'json',
      template: `${templatesPath}/tsconfig.txt`
    })
  }

  const replacements = getReplacesMap(appConfig)
  const extension = appConfig.typescript ? 'ts' : 'js'
  for (const file of files) {
    file.replace = {}
    if (file.extension === 'js') file.extension = extension
    if (replacements[file.name]) file.replace = replacements[file.name]

    for (const key in replacements['*']) {
      file.replace[key] = replacements['*'][key]
    }
  }

  return files
}

function getReplacesMap (appConfig) {
  const replacesMap = {
    '*': {
      '%%fullext': appConfig.typescript ? '.ts' : '.js',
      '%%ext': appConfig.typescript ? '' : '.js'
    },
    package: {
      '%%appName': appConfig.appName,
      '%%executor': appConfig.typescript ? 'tsx' : 'node',
      '%%buildScript': appConfig.typescript ? ',\n"build": "tsc"' : ''
    },
    controllers: {
      '%%tsTypes': appConfig.typescript ? 'import type { Request, Response } from \'express\'\n\n' : '',
      '%%requestType': appConfig.typescript ? ': Request' : '',
      '%%responseType': appConfig.typescript ? ': Response' : ''
    },
    eslintrc: {
      '%%ts': appConfig.typescript ? 'with-typescript' : ''
    }
  }

  return replacesMap
}
