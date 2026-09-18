export default function ResultsTable({ results }) {
  return (
    <div className="table-shell">
      <table className="min-w-[920px]">
        <thead>
          <tr>
            <th>Process ID</th>
            <th>Arrival</th>
            <th>Burst</th>
            <th>Start</th>
            <th>Completion</th>
            <th>Waiting</th>
            <th>Turnaround</th>
          </tr>
        </thead>
        <tbody>
          {results.map((process) => (
            <tr key={`${process.id}-${process.originalIndex}`}>
              <td><strong className="result-process">{process.id}</strong></td>
              <td>{process.arrivalTime}</td>
              <td>{process.burstTime}</td>
              <td>{process.startTime}</td>
              <td>{process.completionTime}</td>
              <td><span className="metric-chip">{process.waitingTime}</span></td>
              <td><span className="metric-chip metric-chip-blue">{process.turnaroundTime}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
