# CPU Scheduling Simulator — Justine Pilay

A React + Tailwind CSS implementation of Machine Problem #2 for Operating Systems.

## Activity Requirements Covered

- Enter the number of processes.
- Enter Process ID, Arrival Time, and Burst Time for every process.
- Choose between FCFS and non-preemptive SJF.
- Calculate waiting time and turnaround time for every process.
- Display average waiting time and average turnaround time.
- Validate required fields, duplicate process IDs, arrival times, and burst times.
- SJF uses FCFS order when burst times are equal.

## Interface

This version uses a dark navy and steel-blue modern dashboard designed as a dark, modern technical dashboard. The layout includes a left simulation control panel, a process-input workspace, summary cards, execution order, Gantt chart, formulas, and detailed results.

## Run the Project

```powershell
npm install
npm run dev
```

Then open the local Vite URL shown in PowerShell, usually `http://localhost:5173/`.

## Build

```powershell
npm run build
```

## Answer Files

Two separately worded sets are included:

- `ANSWER-SET-A.md`
- `ANSWER-SET-B.md`

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
