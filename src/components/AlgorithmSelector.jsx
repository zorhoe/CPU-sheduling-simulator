const algorithms = [
  {
    id: 'FCFS',
    name: 'First Come, First Serve',
    description: 'Runs the process that enters the ready queue first.',
  },
  {
    id: 'SJF',
    name: 'Shortest Job First',
    description: 'Runs the shortest available CPU burst first.',
  },
]

export default function AlgorithmSelector({ algorithm, setAlgorithm }) {
  return (
    <div>
      <p className="field-label">Scheduling Algorithm</p>
      <p className="field-help mb-3">Choose how the CPU should select the next process.</p>

      <div className="algorithm-list">
        {algorithms.map((item) => {
          const selected = algorithm === item.id

          return (
            <button
              key={item.id}
              type="button"
              className={`algorithm-option ${selected ? 'algorithm-option-active' : ''}`}
              onClick={() => setAlgorithm(item.id)}
              aria-pressed={selected}
            >
              <span className="algorithm-code">{item.id}</span>
              <span className="algorithm-copy">
                <strong>{item.name}</strong>
                <small>{item.description}</small>
              </span>
              <span className={`radio-dot ${selected ? 'radio-dot-active' : ''}`} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
