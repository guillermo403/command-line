import readline from 'node:readline/promises'
import { lightblue } from './utils/colors.js'

// eslint-disable-next-line space-before-function-paren
export async function getUserConfig() {
  const questions = [
    {
      title: 'app_name',
      question: `${lightblue('?')} Would you like to name your app? (default: node-app): `,
      value: 'node-app',
      type: 'text',
      map: (value) => value.replace(/\s/g, '-').toLowerCase()
    },
    {
      title: 'express',
      question: 'Would you like to use express? (y/N): ',
      value: 'n',
      dependecies: ['express'],
      type: 'choose'
    },
    {
      title: 'typescript',
      question: 'Would you like to use typescript? (y/N): ',
      value: 'n',
      dependecies: ['typescript', 'tsx'],
      devDependecies: ['@types/express'],
      type: 'choose'
    },
    {
      title: 'git',
      question: 'Would you like to initialize git? (Y/n): ',
      value: 'y',
      type: 'choose'
    }
  ]

  await askQuestions(questions)

  const appConfig = { dependencies: [], devDependencies: [] }

  for (const question of questions) {
    if (question.type === 'text') appConfig[question.title] = question.value
    if (question.type === 'choose') appConfig[question.title] = question.value === 'y' || question.value === 'Y'

    if (question.dependecies && appConfig[question.title]) {
      for (const dep of question.dependecies) {
        appConfig.dependencies.push(dep)
      }
    }
    if (question.devDependecies && appConfig[question.title]) {
      for (const dep of question.devDependecies) {
        appConfig.devDependencies.push(dep)
      }
    }
  }

  globalThis.appConfig = appConfig
  return Promise.resolve(appConfig)
}

/**
 * @param {Array<{ title: string, question: string, value: string, dependecies?: string[], devDependecies?: string[] }>} questions
 * @returns {Promise<void>}
 */
async function askQuestions (questions) {
  const { stdin: input, stdout: output } = process
  const rl = readline.createInterface({ input, output })

  const questionsPromises = []
  for (const question of questions) {
    questionsPromises.push(await rl.question(question.question))
  }

  const answers = await Promise.allSettled(questionsPromises)

  for (let i = 0; i < questions.length; i++) {
    questions[i].value = answers[i].value !== '' ? answers[i].value : questions[i].value

    if (questions[i].map && questions[i].map instanceof Function) {
      questions[i].value = questions[i].map(answers[i].value)
    }
  }

  return Promise.resolve()
}
