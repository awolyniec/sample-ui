import React from 'react';
import moment from 'moment';

import './styles.scss';

const TaskDetails = (props) => {
  const { name, description, dueDate } = props;

  return (
    <div className="task-details">
      <h1>Task Details</h1>
      <h2>{name}</h2>
      <p>{description}</p>
      <div className="due-date">
        <b>Due:</b>
        <span>{moment(dueDate).format('MM/DD/YYYY')}</span>
        {/* <input type="datetime-local" /> */}
      </div>
      <div>
        <button className="finish-button">Mark as done</button>
        <button className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default TaskDetails;