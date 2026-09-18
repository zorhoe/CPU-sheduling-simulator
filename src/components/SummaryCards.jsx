export default function SummaryCards({ summary }) {
  const cards = [
    {
      label: 'Average Waiting Time',
      value: summary.averageWaitingTime,
      hint: 'Average time spent waiting in the ready queue',
    },
    {
      label: 'Average Turnaround Time',
      value: summary.averageTurnaroundTime,
      hint: 'Average time from arrival until completion',
    },
    {
      label: 'CPU Finish Time',
      value: summary.totalCompletionTime,
      hint: 'Time when the final process finishes',
    },
  ]

  return (
    <div className="summary-grid">
      {cards.map((card, index) => (
        <article className="summary-card" key={card.label}>
          <span className="summary-index">0{index + 1}</span>
          <p>{card.label}</p>
          <strong>{card.value}</strong>
          <small>{card.hint}</small>
        </article>
      ))}
    </div>
  )
}
