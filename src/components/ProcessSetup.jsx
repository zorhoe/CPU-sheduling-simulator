export default function ProcessSetup({
  processCount,
  setProcessCount,
  maxProcessCount,
  onDecrease,
  onIncrease,
  onGenerateRows,
}) {
  return (
    <div className="setup-block">
      <div>
        <label className="field-label" htmlFor="process-count">
          Number of Processes
        </label>
        <p className="field-help">Choose how many processes you want to simulate.</p>
      </div>

      <div className="counter-row">
        <div className="counter-control">
          <button type="button" onClick={onDecrease} aria-label="Decrease process count">−</button>
          <input
            id="process-count"
            type="number"
            min="1"
            max={maxProcessCount}
            value={processCount}
            onChange={(event) => setProcessCount(event.target.value)}
            aria-label="Number of processes"
          />
          <button type="button" onClick={onIncrease} aria-label="Increase process count">+</button>
        </div>

        <button className="mini-button" type="button" onClick={onGenerateRows}>
          Update Fields
        </button>
      </div>
    </div>
  )
}
