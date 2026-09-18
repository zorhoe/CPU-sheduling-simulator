export default function ProcessTable({ processes, onProcessChange }) {
  return (
    <div className="table-shell input-table-shell">
      <table className="min-w-[760px]">
        <thead>
          <tr>
            <th>#</th>
            <th>Process ID</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process, index) => (
            <tr key={index}>
              <td><span className="row-index">{String(index + 1).padStart(2, '0')}</span></td>
              <td>
                <input
                  className="process-input"
                  type="text"
                  maxLength="20"
                  value={process.id}
                  onChange={(event) => onProcessChange(index, 'id', event.target.value)}
                  placeholder={`P${index + 1}`}
                  aria-label={`Process ${index + 1} ID`}
                />
              </td>
              <td>
                <input
                  className="process-input"
                  type="number"
                  min="0"
                  step="1"
                  value={process.arrivalTime}
                  onChange={(event) => onProcessChange(index, 'arrivalTime', event.target.value)}
                  placeholder="0"
                  aria-label={`Arrival time for ${process.id || `process ${index + 1}`}`}
                />
              </td>
              <td>
                <input
                  className="process-input"
                  type="number"
                  min="1"
                  step="1"
                  value={process.burstTime}
                  onChange={(event) => onProcessChange(index, 'burstTime', event.target.value)}
                  placeholder="1"
                  aria-label={`Burst time for ${process.id || `process ${index + 1}`}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
