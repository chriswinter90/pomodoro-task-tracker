<script lang="ts">
    import * as Task from '../types/Task';
    import { tasks } from '../store/store';
    export let task: Task;
    let { description, isCompleted } = task;

    const completedChanged = (completed) => {
        task.isCompleted = completed;
        tasks.update(task);
    }

    $: completedChanged(isCompleted);
</script>

<div class="app-task">
    <input id="checkbox" type="checkbox" bind:checked="{isCompleted}">
    <label for="checkbox">{description}</label>
</div>