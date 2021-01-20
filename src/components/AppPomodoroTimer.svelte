<script lang="ts">
  import { timeLeft } from "../store/store";

  let isActive = false;
  let isFinished = true;
  let setTimeInMinutes = 25;
  let timerInterval;

  const toggleTimer = () => {
    isActive = !isActive;
    if (isFinished) {
      $timeLeft = setTimeInMinutes * 60;
    }
    if (isActive) {
      timerInterval = setInterval(() => {
        timeLeft.decrement();
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    isActive = false;
    isFinished = false;
    $timeLeft = setTimeInMinutes * 60;
  };

  const addZeroUnderTen = (value: number) => {
    return value < 10 ? `0${value}` : value;
  }

  $: timeLeftInSeconds = addZeroUnderTen(Math.abs($timeLeft % 60));
  $: timeLeftInMinutes = $timeLeft > 0 ? Math.floor($timeLeft / 60) : `-${Math.abs(Math.ceil($timeLeft / 60))}`;
</script>

<div>
  <h2 class="centered">Timer</h2>
  <div class="pie">

  </div>
  <label for="pomodoro-time" >Timer</label>
  <div>Time Left: {timeLeftInMinutes}:{timeLeftInSeconds}</div>
  <input id="pomodoro-time" name="timer" type="number" bind:value={setTimeInMinutes}>
  <button on:click={() => toggleTimer()}>{isActive ? 'Pause' : 'Start'}</button>
  <button on:click={() => resetTimer()}>Reset</button>
</div>

<style>

  .pie {
    height: 150px;
    width: 150px;
    position: relative;
  }
</style>