import { promisify } from 'node:util'
import { exec, spawn } from 'node:child_process'
const execAsync = promisify(exec)

export default function ({ command, shell = false }) {
  if (!command) return Promise.reject(new Error('No command provided'))
  if (typeof command !== 'string') return Promise.reject(new Error('Command must be a string'))

  if (shell) return executeCommand(command)

  return execAsync(command)
}

function executeCommand (command, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    const subprocess = spawn(command, { stdio: 'inherit', shell: process.env.ComSpec || '/bin/bash', cwd })

    subprocess.on('close', (code) => {
      code !== 0
        ? reject(new Error(`El comando "${command}" falló con el código de salida ${code}`))
        : resolve()
    })
  })
}
