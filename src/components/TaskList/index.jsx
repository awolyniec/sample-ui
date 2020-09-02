import React from 'react';

import TaskListItem from '../TaskListItem';

import './styles.scss';

const TaskList = (props) => {
  const { tasks, onClickNew } = props;

  return (
    <div className="task-list">
      <div className="task-list-header">
        <button
          type="button"
          className="add-new-button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onClickNew();
          }}
        >
          +
        </button>
        <h1>Tasks</h1>
      </div>
      {tasks.map(task => (
        <div className="task-list-item-container">
          <TaskListItem {...task} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;