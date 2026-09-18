function buildBlocks(results) {
  const blocks = []
  let currentTime = 0

  results.forEach((process) => {
    if (currentTime < process.startTime) {
      blocks.push({
        key: `idle-${currentTime}-${process.startTime}`,
        label: 'IDLE',
        start: currentTime,
        end: process.startTime,
        duration: process.startTime - currentTime,
        idle: true,
      })
    }

    blocks.push({
      key: `${process.id}-${process.startTime}-${process.completionTime}`,
      label: process.id,
      start: process.startTime,
      end: process.completionTime,
      duration: process.completionTime - process.startTime,
      idle: false,
    })

    currentTime = process.completionTime
  })

  return blocks
}

export default function GanttChart({ results }) {
  const blocks = buildBlocks(results)

  return (
    <div className="gantt-shell">
      <div className="gantt-track">
        {blocks.map((block, index) => (
          <div
            key={block.key}
            className="gantt-block-wrap"
            style={{
              flexGrow: block.duration,
              flexShrink: 0,
              flexBasis: `${Math.max(104, block.duration * 28)}px`,
            }}
          >
            <div className={`gantt-block ${block.idle ? 'gantt-idle' : ''}`}>
              <span>{block.label}</span>
              <small>{block.duration} unit{block.duration === 1 ? '' : 's'}</small>
            </div>
            <span className="gantt-time gantt-time-start">{block.start}</span>
            {index === blocks.length - 1 && (
              <span className="gantt-time gantt-time-end">{block.end}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
