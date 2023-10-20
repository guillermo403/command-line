export const createInterval = () => {
  const interval = () => setInterval(() => process.stdout.write('.'), 700)
  return {
    interval,
    start: () => interval(),
    stop: () => clearInterval(interval)
  }
}

export const clearAllIntervals = () => {
  const intervalId = setInterval(function () {}, 10 * 1000)

  for (let i = 1; i < intervalId; i++) {
    clearInterval(i)
  }
}
