import fs from 'node:fs'

export const updatePackageJson = (appName, deps) => {
  const pj = fs.readFileSync(`${process.cwd()}/package.json`, 'utf8')
  const packageJson = JSON.parse(pj)
  packageJson.name = appName ?? ''
  packageJson.author = 'Guillermo Merino'
  packageJson.type = 'module'
  packageJson.scripts = {
    dev: 'node --watch index.js',
    lint: 'standard --fix',
    test: 'echo "Error: no test specified" && exit 1'
  }

  if (deps.includes('typescript')) {
    packageJson.scripts.build = 'tsc'
    packageJson.scripts.start = 'node build/index.js'
    packageJson.scripts.dev = 'tsx --watch index.ts'
    packageJson.scripts.lint = 'ts-standard --fix'
  }

  fs.writeFileSync(`${process.cwd()}/package.json`, JSON.stringify(packageJson, null, 2))
  return Promise.resolve()
}
