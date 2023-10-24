import { getDependencies } from './get-dependencies.js'

export const checkDependency = (dependency) => {
  const dependencies = getDependencies()

  return dependencies.includes(dependency)
}
