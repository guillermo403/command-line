import fs from 'node:fs'

export const updatePackageJson = () => {
  const pj = fs.readFileSync(`${process.cwd()}/package.json`, 'utf8')
  const packageJson = JSON.parse(pj)
  packageJson.name = globalThis.appConfig.app_name ?? ''
  packageJson.author = 'Guillermo Merino'
  packageJson.type = 'module'
  packageJson.scripts = {
    dev: 'node --watch index.js',
    lint: 'standard --fix',
    test: 'echo "Error: no test specified" && exit 1'
  }
  fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(packageJson, null, 2))
  return Promise.resolve()
}
