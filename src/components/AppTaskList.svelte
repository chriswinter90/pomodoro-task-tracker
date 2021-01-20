<script lang="ts">
  import AppTask from "./AppTask.svelte";
  import * as Task from "../types/Task";
  import {onDestroy} from "svelte";
  import {tasks} from '../store/store';

  let className;
  export {className as class};

  let myTasks: Task[] = [];
  let tbCreateTask = '';

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

  // Subscribe to the tasks update
  const unsubscribeTasks = tasks.subscribe((value: Task[]) => {
    myTasks = value;
  });

  /**
   * On destroy save tasks and unsubscribe from task store.`
   */
  onDestroy(() => {
    // save tasks before exiting and unsubscribe
    $tasks = myTasks;
    unsubscribeTasks();
  });
</script>

<div class="app-task-list {className}">
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

<style lang="scss">
  .app-task-list {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr min-content min-content;
    grid-row-gap: 5px;

    button {
      margin: 0 30%;
      min-height: 30px;
    }
  }

  ol {
    text-align: left;
  }
</style>