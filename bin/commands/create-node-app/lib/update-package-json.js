import fs from 'node:fs'

export const updatePackageJson = (packageName) => {
  const pj = fs.readFileSync(`${process.cwd()}/package.json`, 'utf8')
  const packageJson = JSON.parse(pj)
  packageJson.name = packageName ?? ''
  packageJson.author = 'Guillermo Merino'
  packageJson.scripts = {
    dev: 'node --watch index.js',
    lint: 'standard --fix',
    test: 'echo "Error: no test specified" && exit 1'
  }
  fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(packageJson, null, 2))
  return Promise.resolve()
}
