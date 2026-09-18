export default function ExecutionOrder({ results }) {
  return (
    <div className="execution-track">
      {results.map((process, index) => (
        <div className="execution-item" key={`${process.id}-${process.originalIndex}`}>
          <span className="execution-pill">{process.id}</span>
          {index < results.length - 1 && <span className="execution-arrow">→</span>}
        </div>
      ))}
    </div>
  )
}
