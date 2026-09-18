export function validateProcesses(processes) {
  const errors = []

  if (!Array.isArray(processes) || processes.length === 0) {
    return ['Generate at least one process before calculating.']
  }

  const usedIds = new Set()

  processes.forEach((process, index) => {
    const row = index + 1
    const id = String(process.id ?? '').trim()
    const arrivalText = String(process.arrivalTime ?? '').trim()
    const burstText = String(process.burstTime ?? '').trim()
    const arrivalTime = Number(arrivalText)
    const burstTime = Number(burstText)

    if (!id) {
      errors.push(`Row ${row}: Process ID is required.`)
    } else {
      const normalizedId = id.toLowerCase()
      if (usedIds.has(normalizedId)) {
        errors.push(`Row ${row}: Process ID "${id}" is already used.`)
      }
      usedIds.add(normalizedId)
    }

    if (arrivalText === '' || !Number.isInteger(arrivalTime) || arrivalTime < 0) {
      errors.push(`Row ${row}: Arrival time must be a whole number starting from 0.`)
    }

    if (burstText === '' || !Number.isInteger(burstTime) || burstTime <= 0) {
      errors.push(`Row ${row}: Burst time must be a whole number greater than 0.`)
    }
  })

  return [...new Set(errors)]
}
