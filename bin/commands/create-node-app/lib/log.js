import colors from './utils/colors.js'

export default function ({ text, color, breakLine = false }) {
  if (arguments.length === 0) {
    return
  }
  if (typeof arguments[0] === 'string') {
    text = arguments[0]
    breakLine = true
  }

  color ??= colors.nocolor

  process.stdout.write(color(text))
  if (breakLine) {
    process.stdout.write('\n')
  }
}
