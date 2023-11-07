#!/usr/bin/env node

import getArgs from './lib/user-config/get-args.js'
import getPromptQuestions from './lib/user-config/prompt-questions.js'
import foldersHelper from './lib/helpers/folders-helper.js'
import scaffoldApp from './lib/scaffold-app.js'
import install from './lib/install-dependencies.js'
import initializeGit from './lib/utils/initialize-git.js'
import finishCommand from './lib/utils/finish-command.js'
import initializeEslint from './lib/utils/initialize-eslint.js'

function createnodeapp () {
  const appConfig = {}

  console.clear()

  getArgs()
    .then(({ name }) => { appConfig.appName = name ?? '' })
    .then(() => getPromptQuestions(appConfig))
    .then((userAnswers) => Object.assign(appConfig, userAnswers))
    .then(async () => await foldersHelper.create(appConfig.appName))
    .then(() => process.chdir(appConfig.appName))
    .then(async () => await initializeEslint(appConfig))
    .then(async () => await scaffoldApp(appConfig))
    .then(() => install(appConfig))
    .then(() => initializeGit(appConfig))
    .then(() => finishCommand(appConfig))
    .catch((err) => console.error(err))
}

createnodeapp()
