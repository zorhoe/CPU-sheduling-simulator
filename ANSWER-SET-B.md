# Machine Problem #2 — Answer Set B

**Student:** Justine Pilay  
**Subject:** Operating System  
**Activity:** Machine Problem #2 — FCFS and SJF Scheduling

> Note: Some of the requested definitions are only listed as questions in the handout, so this set uses standard operating-system concepts to answer them.

## Pre-Lab Questions

### a. Define operating system.
An operating system is the main software responsible for controlling a computer's resources. It provides services to applications and manages components such as the processor, memory, storage, files, and input/output devices.

### b. What are the different types of operating systems?
Examples of operating-system types are batch systems, time-sharing systems, real-time systems, network systems, distributed systems, and multiprocessing systems. These types differ in how they process jobs, support users, and manage available hardware resources.

### c. Define a process.
A process is an active instance of a program. Unlike a program stored as a file, a process is currently running or waiting to run and has information such as its current state, instructions, memory, and assigned resources.

### d. What is CPU Scheduling?
CPU scheduling is the operating system's procedure for choosing the next ready process that will be assigned to the CPU. Algorithms such as FCFS and SJF provide rules for deciding the execution order.

### e. Define arrival time, burst time, waiting time, and turnaround time.
- **Arrival Time:** the point in time when a process becomes ready and joins the ready queue.
- **Burst Time:** the amount of processor time the process needs for its CPU work.
- **Waiting Time:** the amount of time the process stays in the ready queue without using the CPU.
- **Turnaround Time:** the full amount of time between the process's arrival and its completion.

## Post-Lab Questions

### 1. What is the real difficulty with the SJF CPU scheduling algorithm?
SJF works best when the length of the next CPU burst is known, but that information is difficult to know in advance. The operating system normally has to predict the burst length. Another concern is starvation because a long job can be repeatedly delayed when many short jobs are available.

### 2. How can you determine which CPU algorithm is effective?
The effectiveness of a scheduling algorithm depends on the goal of the system. It can be checked using average waiting time, turnaround time, response time, throughput, CPU utilization, and fairness. In the simulation, FCFS and SJF can be compared by running the same processes and observing which one produces better waiting-time and turnaround-time results.

### 3. How to compute the waiting time and burst time of every process?
For each process, waiting time is the difference between the time it starts and the time it arrived:

`Waiting Time = Start Time - Arrival Time`

Another equivalent formula is:

`Waiting Time = Turnaround Time - Burst Time`

Burst time is generally provided before the scheduling calculation because it is the CPU time needed by the process. It is not produced by FCFS or SJF; the algorithms use that burst-time value when deciding and calculating the schedule.

### 4. How to compute the average waiting time and average burst time of every process?
First, find the waiting time of every process. Add those values and divide by the total number of processes:

`Average Waiting Time = Σ Waiting Time / Number of Processes`

The same method is used for burst time:

`Average Burst Time = Σ Burst Time / Number of Processes`

Since Machine Problem #2 also requires the average turnaround time, it is calculated as:

`Average Turnaround Time = Σ Turnaround Time / Number of Processes`

## Conclusion
The simulation shows that CPU scheduling changes the order and amount of time processes spend waiting. FCFS prioritizes the order of arrival, while non-preemptive SJF prioritizes the shortest burst among the processes that are already ready. The calculated averages provide a clear way to observe the effect of each algorithm on the same workload.
