import { useMemo, useState } from 'react'
import AlgorithmSelector from './components/AlgorithmSelector'
import ExecutionOrder from './components/ExecutionOrder'
import FormulaReference from './components/FormulaReference'
import GanttChart from './components/GanttChart'
import ProcessSetup from './components/ProcessSetup'
import ProcessTable from './components/ProcessTable'
import ResultsTable from './components/ResultsTable'
import SummaryCards from './components/SummaryCards'
import { calculateFCFS } from './utils/fcfs'
import { calculateSJF } from './utils/sjf'
import { validateProcesses } from './utils/validation'

const DEFAULT_PROCESS_COUNT = 5
const MAX_PROCESS_COUNT = 50

function createProcesses(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: `P${index + 1}`,
    arrivalTime: '',
    burstTime: '',
  }))
}

export default function App() {
  const [processCount, setProcessCount] = useState(DEFAULT_PROCESS_COUNT)
  const [processes, setProcesses] = useState(createProcesses(DEFAULT_PROCESS_COUNT))
  const [algorithm, setAlgorithm] = useState('FCFS')
  const [errors, setErrors] = useState([])
  const [results, setResults] = useState([])
  const [summary, setSummary] = useState(null)

  const totalBurst = useMemo(
    () =>
      processes.reduce((sum, process) => {
        const burst = Number(process.burstTime)
        return sum + (Number.isFinite(burst) && burst > 0 ? burst : 0)
      }, 0),
    [processes],
  )

  const clearResults = () => {
    setResults([])
    setSummary(null)
  }

  const handleGenerateRows = () => {
    const count = Number(processCount)

    if (!Number.isInteger(count) || count < 1 || count > MAX_PROCESS_COUNT) {
      setErrors([`Enter a whole number from 1 to ${MAX_PROCESS_COUNT}.`])
      return
    }

    setProcesses(createProcesses(count))
    clearResults()
    setErrors([])
  }

  const handleCountStep = (change) => {
    const current = Number(processCount) || DEFAULT_PROCESS_COUNT
    const next = Math.min(MAX_PROCESS_COUNT, Math.max(1, current + change))
    setProcessCount(next)
  }

  const handleProcessChange = (index, field, value) => {
    setProcesses((current) =>
      current.map((process, processIndex) =>
        processIndex === index ? { ...process, [field]: value } : process,
      ),
    )
    clearResults()
    setErrors([])
  }

  const handleAlgorithmChange = (value) => {
    setAlgorithm(value)
    clearResults()
    setErrors([])
  }

  const handleCalculate = () => {
    const validationErrors = validateProcesses(processes)

    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      clearResults()
      return
    }

    const parsedProcesses = processes.map((process, index) => ({
      id: process.id.trim(),
      arrivalTime: Number(process.arrivalTime),
      burstTime: Number(process.burstTime),
      originalIndex: index,
    }))

    const computed =
      algorithm === 'FCFS'
        ? calculateFCFS(parsedProcesses)
        : calculateSJF(parsedProcesses)

    setResults(computed.results)
    setSummary(computed.summary)
    setErrors([])

    window.requestAnimationFrame(() => {
      document.getElementById('results')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  const handleLoadSample = () => {
    const sample = [
      { id: 'P1', arrivalTime: 2, burstTime: 8 },
      { id: 'P2', arrivalTime: 0, burstTime: 4 },
      { id: 'P3', arrivalTime: 3, burstTime: 2 },
      { id: 'P4', arrivalTime: 9, burstTime: 5 },
      { id: 'P5', arrivalTime: 6, burstTime: 7 },
    ]

    setProcessCount(sample.length)
    setProcesses(sample)
    clearResults()
    setErrors([])
  }

  const handleReset = () => {
    setProcessCount(DEFAULT_PROCESS_COUNT)
    setProcesses(createProcesses(DEFAULT_PROCESS_COUNT))
    setAlgorithm('FCFS')
    setErrors([])
    clearResults()
  }

  return (
    <div className="app-shell min-h-screen">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <div className="page-width topbar-inner">
          <div className="brand-lockup">
            <div className="brand-mark">JP</div>
            <div>
              <p className="brand-title">CPU scheduling</p>
              <p className="brand-subtitle">Simulator</p>
            </div>
          </div>

          <div className="student-badge">
            <span>Prepared by:</span>
            <strong>Justine Pilay</strong>
          </div>
        </div>
      </header>

      <main className="page-width pb-14 pt-8 sm:pt-10">
        <section className="hero-panel">
          <div className="hero-copy">
            <span className="kicker">CPU Scheduling Simulator</span>
            <h1>See how each process gets CPU time.</h1>
            <p>
              Enter the process details, select FCFS or non-preemptive SJF, then run the
              simulation to calculate waiting time and turnaround time.
            </p>
          </div>

          <div className="hero-stats">
            <div>
              <span>Algorithm</span>
              <strong>{algorithm}</strong>
            </div>
            <div>
              <span>Processes</span>
              <strong>{processes.length}</strong>
            </div>
            <div>
              <span>Total Burst</span>
              <strong>{totalBurst}</strong>
            </div>
          </div>
        </section>

        <section className="workspace-grid">
          <aside className="control-panel">
            <div className="panel-heading">
              <span className="step-number">01</span>
              <div>
                <p className="panel-label">Setup</p>
                <h2>Simulation Controls</h2>
              </div>
            </div>

            <ProcessSetup
              processCount={processCount}
              setProcessCount={setProcessCount}
              maxProcessCount={MAX_PROCESS_COUNT}
              onDecrease={() => handleCountStep(-1)}
              onIncrease={() => handleCountStep(1)}
              onGenerateRows={handleGenerateRows}
            />

            <div className="control-divider" />

            <AlgorithmSelector
              algorithm={algorithm}
              setAlgorithm={handleAlgorithmChange}
            />

            {errors.length > 0 && (
              <div className="error-box" role="alert">
                <strong>Check your entries</strong>
                <ul>
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="action-stack">
              <button className="btn btn-primary" type="button" onClick={handleCalculate}>
                Run Simulation
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <button className="btn btn-secondary" type="button" onClick={handleLoadSample}>
                  Use Example
                </button>
                <button className="btn btn-ghost" type="button" onClick={handleReset}>
                  Clear
                </button>
              </div>
            </div>
          </aside>

          <section className="input-panel">
            <div className="panel-heading panel-heading-row">
              <div className="flex items-center gap-3">
                <span className="step-number">02</span>
                <div>
                  <p className="panel-label">Process Details</p>
                  <h2>Enter the Input Values</h2>
                </div>
              </div>
              <span className="required-note">All fields are required</span>
            </div>

            <div className="plain-guide">
              <div><strong>Arrival Time</strong><span>When the process becomes ready.</span></div>
              <div><strong>Burst Time</strong><span>How much CPU time the process needs.</span></div>
            </div>

            <ProcessTable processes={processes} onProcessChange={handleProcessChange} />
          </section>
        </section>

        {summary && (
          <section id="results" className="results-section scroll-mt-6">
            <div className="results-heading">
              <div>
                <span className="kicker">03 / Results</span>
                <h2>Simulation Summary</h2>
                <p>
                  These values are based on the actual execution order produced by {algorithm}.
                </p>
              </div>
              <span className="result-status">Simulation complete</span>
            </div>

            <SummaryCards summary={summary} />

            <div className="result-layout">
              <article className="result-card order-card">
                <div className="result-card-heading">
                  <div>
                    <span>Execution</span>
                    <h3>Process Order</h3>
                  </div>
                  <small>First → Last</small>
                </div>
                <ExecutionOrder results={results} />
              </article>

              <FormulaReference algorithm={algorithm} />
            </div>

            <article className="result-card">
              <div className="result-card-heading">
                <div>
                  <span>Timeline</span>
                  <h3>Gantt Chart</h3>
                </div>
                <small>CPU execution over time</small>
              </div>
              <GanttChart results={results} />
            </article>

            <article className="result-card">
              <div className="result-card-heading">
                <div>
                  <span>Details</span>
                  <h3>Process Results</h3>
                </div>
                <small>Waiting and turnaround per process</small>
              </div>
              <ResultsTable results={results} />
            </article>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="page-width footer-inner">
          <p>CPU Scheduling Simulator</p>
          <span>FCFS · SJF · Non-Preemptive</span>
          <span>Justine Pilay</span>
        </div>
      </footer>
    </div>
  )
}
