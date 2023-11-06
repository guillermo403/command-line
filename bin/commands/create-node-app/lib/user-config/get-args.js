import yargs from 'yargs/yargs'

export default function () {
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

  return Promise.resolve({ name })
}
