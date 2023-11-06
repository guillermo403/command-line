import { promisify } from 'node:util'
import { exec } from 'node:child_process'
const execAsync = promisify(exec)

export default function (cmd) {
  if (!cmd) return Promise.reject(new Error('No command provided'))
  if (typeof cmd !== 'string') return Promise.reject(new Error('Command must be a string'))

  return execAsync(cmd)
}
