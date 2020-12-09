import { writable } from 'svelte/store';
import Task from '../types/Task';

const createTasks = () => {
    const { subscribe, set, update } = writable(JSON.parse(localStorage.getItem('tasks')) || []);

    const storeAndSet = (tasks: Task[]) => {
      save(tasks);
      set(tasks);
    };

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
    const { subscribe, set, update } = writable(0);

    return {
        subscribe,
        set,
        decrement: () => update(n => n - 1),
    }
}

export const tasks = createTasks();
export const timeLeft = createTimeLeft();