import yargs from 'yargs/yargs'
import foldersHelper from '../helpers/folders-helper.js'

export default async function () {
  const { name } = yargs(process.argv.slice(2))
    .options({
      name: {
        type: 'string',
        alias: 'n',
        description: 'Name of the project',
        demandOption: false
      }
    })
    .argv

  if (await foldersHelper.exists(name)) {
    return Promise.reject(new Error('A folder with the same name already exists and is not empty'))
  }

  return Promise.resolve({ name })
}
