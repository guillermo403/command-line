#!/usr/bin/env node

import finishCommand from './lib/utils/finish-command.js'
import foldersHelper from './lib/helpers/folders-helper.js'
import getArgs from './lib/user-config/get-args.js'
import getPromptQuestions from './lib/user-config/prompt-questions.js'
import initializeGit from './lib/utils/initialize-git.js'
import install from './lib/install-dependencies.js'
import scaffoldApp from './lib/scaffold-app.js'
import initializeEslint from './lib/utils/initialize-eslint.js'

function createnodeapp () {
  const appConfig = {}

  console.clear()

  getArgs()
    .then(({ name }) => { appConfig.appName = name ?? '' })
    .then(() => getPromptQuestions(appConfig))
    .then((userAnswers) => Object.assign(appConfig, userAnswers))
    .then(() => foldersHelper.create(appConfig.appName))
    .then(() => process.chdir(appConfig.appName))
    .then(async () => await scaffoldApp(appConfig))
    .then(() => initializeEslint(appConfig))
    .then(() => install(appConfig))
    .then(() => initializeGit(appConfig))
    .then(() => finishCommand(appConfig))
    .catch(console.error)
}

createnodeapp()

// TODO: Corregir los scripts del package.json para typescript
