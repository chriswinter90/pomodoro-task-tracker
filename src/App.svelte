<script lang="ts">
	import { tasks } from './store/store'
	import * as Task from "./types/Task";
	import AppTask from './components/AppTask';
	import {onDestroy} from "svelte";

	let myTasks: Task[] = [];
	let title: string = 'Hello Pomodoro!';
	let tbCreateTask = '';

	const unsubscribeTasks = tasks.subscribe((value: Task[]) => {
		console.log('New tasks:', value);
		myTasks = value;
	});

	/**
	 * Creates a new task
	 */
	const createTask = () => {
		myTasks.push({
			isCompleted: false,
			description: tbCreateTask,
		});

		tbCreateTask = '';
		$tasks = myTasks;
	};

	onDestroy(() => {
		// save tasks before exiting and unsubscribe
		$tasks = myTasks;
		unsubscribeTasks();
	});

</script>

<main>
	<h1 class="centered">{title}</h1>
	<div class="task-list">
		<h2 class="centered">Tasks</h2>
		<ol>
			{#each $tasks as task, i (task.description)}
				<li>
					<AppTask bind:task={task}/>
				</li>
			{/each}
		</ol>
		<label for="tb-task-description">Desc: </label>
		<input
			id="tb-task-description"
			type="text"
			bind:value={tbCreateTask}
			on:keyup={(e) => {
				if (e.key === 'Enter') createTask();
			}}
		/>
		<button on:click={() => createTask()}>Create Task</button>
		<button on:click={() => tasks.clearCompleted()}>Clear Completed</button>
	</div>
	<div class="pomodoro-control">
		<h2 class="centered">Timer</h2>
	</div>
</main>

<style lang="scss">
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		display: grid;
		grid-template-rows: 100px 1fr;
		grid-template-columns: 1fr 20px 1fr;
		grid-template-areas:
			'header   header header'
			'taskList .     pomodoroControl';
		color: white;
		height: 100%;
		h1, h2 {
			margin: 0;
		}
		h1 {
			margin-top: 20px;
			grid-area: header;
			color: #ff3e00;
			text-transform: uppercase;
			font-size: 40px;
			line-height: 1.1;
			font-weight: 700;
		}

		.centered {
			text-align: center;
		}

		@media (min-width: 640px) {
			max-width: none;
		}

		.task-list {
			grid-area: taskList;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: min-content 1fr;
			button {
				margin: 5px 30%;
				min-height: 30px;
			}
		}

		.pomodoro-control {
			grid-area: pomodoroControl;
		}

		ol {
			text-align: left;
		}
	}
</style>
