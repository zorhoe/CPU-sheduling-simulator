export function calculateSJF(processes) {
  const pending = [...processes].sort((a, b) => {
    if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime
    return a.originalIndex - b.originalIndex
  })

  const results = []
  let currentTime = 0

  while (pending.length > 0) {
    let available = pending.filter((process) => process.arrivalTime <= currentTime)

    if (available.length === 0) {
      currentTime = pending[0].arrivalTime
      available = pending.filter((process) => process.arrivalTime <= currentTime)
    }

    available.sort((a, b) => {
      if (a.burstTime !== b.burstTime) return a.burstTime - b.burstTime
      if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime
      return a.originalIndex - b.originalIndex
    })

    const selected = available[0]
    const selectedIndex = pending.findIndex(
      (process) => process.originalIndex === selected.originalIndex,
    )

    pending.splice(selectedIndex, 1)

    const startTime = Math.max(currentTime, selected.arrivalTime)
    const completionTime = startTime + selected.burstTime
    const waitingTime = startTime - selected.arrivalTime
    const turnaroundTime = completionTime - selected.arrivalTime

    results.push({
      ...selected,
      startTime,
      completionTime,
      waitingTime,
      turnaroundTime,
    })

    currentTime = completionTime
  }

  return buildOutput(results, currentTime)
}

function buildOutput(results, totalCompletionTime) {
  const totalWaitingTime = results.reduce((sum, process) => sum + process.waitingTime, 0)
  const totalTurnaroundTime = results.reduce(
    (sum, process) => sum + process.turnaroundTime,
    0,
  )

  return {
    results,
    summary: {
      averageWaitingTime: (totalWaitingTime / results.length).toFixed(2),
      averageTurnaroundTime: (totalTurnaroundTime / results.length).toFixed(2),
      totalCompletionTime,
    },
  }
}
