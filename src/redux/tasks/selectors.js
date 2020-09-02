import { createSelector } from 'reselect';

const selectTasksState = state => state.tasks;

export const selectTasks = createSelector(
  [selectTasksState],
  tasks => tasks.tasks
);