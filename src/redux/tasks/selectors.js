import { createSelector } from 'reselect';

const selectTasksState = state => state.tasks;

export const selectTasks = createSelector(
  [selectTasksState],
  tasks => tasks.tasks
);

export const selectTaskCreationConfirmationStatus = createSelector(
  [selectTasksState],
  tasks => tasks.createdTaskConfirmation
);

export const selectTaskCompletionConfirmationStatus = createSelector(
  [selectTasksState],
  tasks => tasks.completedTaskConfirmation
);

export const selectTaskDeletionConfirmationStatus = createSelector(
  [selectTasksState],
  tasks => tasks.deletedTaskConfirmation
);
