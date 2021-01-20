import {writable} from 'svelte/store';
import Task from '../types/Task';

/**
 * Creates the tasks store
 */
const createTasks = () => {
  const {subscribe, set, update} = writable(JSON.parse(localStorage.getItem('tasks')) || []);

  /**
   * Sets and stores tasks to store and local storage overriding the default store set
   * @param {Task[]} tasks
   */
  const storeAndSet = (tasks: Task[]) => {
    save(tasks);
    set(tasks);
  };

  /**
   * Updates a specific task
   *
   * @param {Task} task
   */
  const updateTask = (task: Task) => {
    update((tasks) => {
      const index = tasks.findIndex(t => t.description === task.description);
      tasks[index] = task;
      return tasks;
    });
  };

  /**
   * Clear completed tasks and save to localStorage.
   */
  const clearCompleted = () => {
    update((tasks) => {
      tasks = tasks.filter((task) => !task.isCompleted);
      save(tasks);
      return tasks;
    });
  }

  /**
   * Save tasks to local storage
   *
   * @param {Task[]} tasks - tasks to save
   */
  const save = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  return {
    subscribe,
    set: storeAndSet,
    update: updateTask,
    clearCompleted,
    deleteAll: () => storeAndSet([]),
  }
}

const createTimeLeft = () => {
  const {subscribe, set, update} = writable(0);

  return {
    subscribe,
    set,
    decrement: () => update(n => n - 1),
  }
}

export const tasks = createTasks();
export const timeLeft = createTimeLeft();