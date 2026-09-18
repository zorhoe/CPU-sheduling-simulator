# Machine Problem #2 — Answer Set A

**Student:** Justine Pilay  
**Subject:** Operating System  
**Activity:** Machine Problem #2 — Non-Preemptive CPU Scheduling

> Note: The activity handout lists these questions but does not provide complete answers for all of them. The answers below use standard operating-system terminology while keeping the activity focused on FCFS and non-preemptive SJF.

## Pre-Lab Questions

### a. Define operating system.
An operating system is system software that manages the computer's hardware and software resources. It acts as the connection between the user, applications, and hardware, and it handles tasks such as process management, memory management, file management, and device control.

### b. What are the different types of operating systems?
Common types of operating systems include batch operating systems, time-sharing operating systems, real-time operating systems, distributed operating systems, network operating systems, and multiprocessing operating systems. Each type is designed for a particular way of managing users, processes, and computer resources.

### c. Define a process.
A process is a program that is currently being executed. It includes the program instructions, current state, data, and the resources needed while the program is running.

### d. What is CPU Scheduling?
CPU scheduling is the method used by the operating system to decide which process in the ready queue will use the CPU next. Scheduling algorithms are used to organize the order of process execution.

### e. Define arrival time, burst time, waiting time, and turnaround time.
- **Arrival Time** — the time when a process enters the ready queue and becomes available for execution.
- **Burst Time** — the amount of CPU time required by a process to complete its execution.
- **Waiting Time** — the total time a process spends waiting in the ready queue before receiving CPU time.
- **Turnaround Time** — the total time from the arrival of a process until it finishes execution.

## Post-Lab Questions

### 1. What is the real difficulty with the SJF CPU scheduling algorithm?
The main difficulty of SJF is knowing the CPU burst time before a process runs. In real systems, the exact future burst time is usually not known, so it must be estimated. SJF may also cause long processes to wait for a long time when shorter processes keep arriving.

### 2. How can you determine which CPU algorithm is effective?
A CPU scheduling algorithm can be evaluated by comparing measures such as average waiting time, average turnaround time, CPU utilization, throughput, response time, and fairness. For this activity, the algorithm with lower average waiting time and turnaround time can be considered more efficient for the given set of processes.

### 3. How to compute the waiting time and burst time of every process?
Waiting time can be computed using:

`Waiting Time = Start Time - Arrival Time`

It can also be computed as:

`Waiting Time = Turnaround Time - Burst Time`

Burst time is normally given as an input because it represents the CPU execution time required by the process. It may also be measured from the amount of CPU time used by the process.

### 4. How to compute the average waiting time and average burst time of every process?
Add all waiting times and divide the result by the number of processes:

`Average Waiting Time = Total Waiting Time / Number of Processes`

Add all burst times and divide the result by the number of processes:

`Average Burst Time = Total Burst Time / Number of Processes`

For the main activity requirement, average turnaround time is computed as:

`Average Turnaround Time = Total Turnaround Time / Number of Processes`

## Conclusion
The activity demonstrated how FCFS and non-preemptive SJF arrange processes for CPU execution. FCFS executes processes according to arrival order, while SJF selects the shortest available CPU burst. By computing waiting time and turnaround time, the behavior and performance of each scheduling method can be compared using the same set of processes.
