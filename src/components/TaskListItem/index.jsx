import React from 'react';
import classnames from 'classnames';

import './styles.scss';

const TaskListItem = (props) => {
  const {
    isComplete, isDueToday, isDueTomorrow, isOverdue,
    text, isSelected, onSelect, onComplete
  } = props;
  return (
    <div
      className={classnames("task-list-item", { complete: isComplete, selected: isSelected })}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onSelect();
      }}
    >
      <button
        type="button"
        disabled={isComplete}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onComplete();
        }}
      >
        Done
      </button>
      <span className="task-text">{text}</span>
      <div className="right-content">
        {isDueToday && (
          <span className="soon-due-text">Today</span>
        )} 
        {isDueTomorrow && (
          <span className="soon-due-text">Tomorrow</span>
        )}
        {isOverdue && (
          <span className="overdue-text">Overdue</span>
        )}
        <button className="button">Delete</button>
      </div>
    </div>
  );
};

export default TaskListItem;