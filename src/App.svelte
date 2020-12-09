<script lang="ts">
  import AppTaskList from "./components/AppTaskList.svelte";
  import AppPomodoroControl from "./components/AppPomodoroTimer.svelte";

  let title: string = 'Hello Pomodoro!';

</script>

<main>
  <h1 class="centered">{title}</h1>
  <div class="task-list">
    <AppTaskList/>
  </div>
  <div class="pomodoro-timer">
    <AppPomodoroControl/>
  </div>
</main>

<style lang="scss">
  main {
    margin: 0 auto;
    display: grid;
    grid-template-rows: 100px 1fr;
    grid-template-columns: 1fr 20px 1fr;
    grid-template-areas:
			'header   header header'
			'taskList .      pomodoroTimer';
    color: white;
    height: 100%;

    .task-list {
      grid-area: taskList;
    }

    .pomodoro-timer {
      grid-area: pomodoroTimer;
    }
  }
</style>
