export function calculateFCFS(processes) {
  const sorted = [...processes].sort((a, b) => {
    if (a.arrivalTime !== b.arrivalTime) return a.arrivalTime - b.arrivalTime
    return a.originalIndex - b.originalIndex
  })

  let currentTime = 0

  const results = sorted.map((process) => {
    const startTime = Math.max(currentTime, process.arrivalTime)
    const completionTime = startTime + process.burstTime
    const waitingTime = startTime - process.arrivalTime
    const turnaroundTime = completionTime - process.arrivalTime

    currentTime = completionTime

    return {
      ...process,
      startTime,
      completionTime,
      waitingTime,
      turnaroundTime,
    }
  })

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
