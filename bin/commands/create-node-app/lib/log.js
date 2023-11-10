import colors from './utils/colors.js'

export default function ({ text, color, breakLine = false, hideCursor = false, loading = false }) {
  if (arguments.length === 0) {
    return
  }
  if (typeof arguments[0] === 'string') {
    text = arguments[0]
    breakLine = true
  }

  color ??= colors.nocolor

  process.stdout.write(color(text))
  if (loading) {
    process.stdout.write(color('...'))
  }

  if (breakLine) {
    process.stdout.write('\n')
  }
  if (hideCursor) {
    process.stdout.write('\u001B[?25l')
  } else {
    process.stdout.write('\u001B[?25h')
  }

  if (loading) {
    const interval = setInterval(() => {
      process.stdout.write(color('.'))
    }, 500)
    return {
      stop: () => {
        clearInterval(interval)
      }
    }
  } else {
    return {
      stop: () => {}
    }
  }
}
