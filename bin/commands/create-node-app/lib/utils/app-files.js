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
  const packageJsonScripts = appConfig.typescript
    ? {
        start: 'node build/src/index.js',
        dev: 'tsx --watch src/index.ts',
        build: 'tsc'
      }
    : {
        start: 'node index.js',
        dev: 'node --watch src/index.js'
      }

  const replacesMap = {
    '*': {
      '%%fullext': appConfig.typescript ? '.ts' : '.js',
      '%%ext': appConfig.typescript ? '' : '.js'
    },
    package: {
      '%%appName': appConfig.appName,
      '%%scripts': JSON.stringify(packageJsonScripts, null, 2) + ','
    },
    controllers: {
      '%%tsTypes': appConfig.typescript ? 'import type { Request, Response } from \'express\'\n\n' : '',
      '%%requestType': appConfig.typescript ? ': Request' : '',
      '%%responseType': appConfig.typescript ? ': Response' : ''
    }
  }

  return replacesMap
}
