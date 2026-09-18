export default function FormulaReference({ algorithm }) {
  return (
    <article className="result-card formula-panel">
      <div className="result-card-heading">
        <div>
          <span>Reference</span>
          <h3>How the values are calculated</h3>
        </div>
        <small>{algorithm}</small>
      </div>

      <div className="formula-list">
        <div>
          <span>Waiting Time</span>
          <code>Start Time − Arrival Time</code>
        </div>
        <div>
          <span>Completion Time</span>
          <code>Start Time + Burst Time</code>
        </div>
        <div>
          <span>Turnaround Time</span>
          <code>Completion Time − Arrival Time</code>
        </div>
      </div>

      <p className="algorithm-note">
        {algorithm === 'FCFS'
          ? 'FCFS follows the order in which processes arrive. If arrival times are equal, the original input order is kept.'
          : 'Non-preemptive SJF chooses the shortest burst among processes that have already arrived. Equal burst times use FCFS order.'}
      </p>
    </article>
  )
}
