export default function (appConfig) {
  const dependencies = []
  const devDependencies = []

  if (appConfig.express) {
    dependencies.push('express')
  }

  if (appConfig.typescript) {
    devDependencies.push('typescript', '@types/node', 'tsx')
  }

  if (appConfig.prettier) {
    devDependencies.push('prettier')
  }

  if (appConfig.express && appConfig.typescript) {
    devDependencies.push('@types/express')
  }

  return [dependencies.join(' '), devDependencies.join(' ')]
}
