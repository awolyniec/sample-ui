import React from 'react';
import moment from 'moment';

import './styles.scss';

const NewTaskDetails = (props) => {
  const { name, description, dueDate } = props;

  return (
    <div className="new-task-details">
      <h1>Task Details</h1>
      <div className="contents-below-header">
        <div className="name-input">
          <input type="text" placeholder="Enter task name here." />
        </div>
        <div className="description-input">
          <textarea placeholder="Enter task description here." />
        </div>
        <div className="due-date">
          <b>Due:</b>
          <input type="datetime-local" />
        </div>
        <div>
          <button className="create-button">Create</button>
          <button className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskDetails;