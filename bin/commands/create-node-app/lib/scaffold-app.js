import { join } from 'node:path'
import foldersHelper from './helpers/folders-helper.js'
import filesHelper from './helpers/files-helper.js'
import log from './log.js'
import colors from './utils/colors.js'

export default async function (appConfig) {
  log({
    text: 'Scaffolding app... ',
    color: colors.info,
    breakLine: false
  })

  const { create: createFolder } = foldersHelper
  const { create: createFile } = filesHelper

  const folders = getFolders(appConfig)
  for await (const folder of folders) {
    await createFolder(folder)
  }

  const files = getFiles(appConfig)
  for await (const file of files) {
    const { path, extension, template, replace } = file
    const filePath = `${path}.${extension}`

    let content = await filesHelper.read(template)
    if (replace) {
      for (const key in replace) {
        const regex = new RegExp(key, 'g')
        content = content.replace(regex, replace[key])
      }
    }

    await createFile(filePath, content)
  }

  log({
    text: '[v]',
    color: colors.success,
    breakLine: true
  })
  return Promise.resolve({ folders, files })
}

function getFolders (appConfig) {
  const src = join('src')

  const folders = [
    src,
    join(src, 'lib')
  ]

  if (appConfig.express) {
    folders.push(join(src, 'routes'))
    folders.push(join(src, 'middlewares'))
    folders.push(join(src, 'controllers'))
  }

  if (appConfig.typescript) {
    folders.push(join(src, 'types'))
  }

  return folders
}

function getFiles (appConfig) {
  const src = 'src'
  const templatesPath = join(import.meta.url.replace(/file:/, ''), '..', 'templates')

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
      '%%tsTypes': appConfig.typescript ? 'import type { Request, Response } from \'express\'' : '',
      '%%requestType': appConfig.typescript ? ': Request' : '',
      '%%responseType': appConfig.typescript ? ': Response' : ''
    },
    eslintrc: {
      '%%ts': appConfig.typescript ? 'with-typescript' : ''
    }
  }

  return replacesMap
}
