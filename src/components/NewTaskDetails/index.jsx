import React from 'react';

import './styles.scss';

const NewTaskDetails = (props) => {
  const {
    name, description, dueDate, onChangeName, onChangeDescription,
    onChangeDueDate, onCreate
  } = props;

  return (
    <div className="new-task-details">
      <h1>Task Details</h1>
      <div className="contents-below-header">
        <div className="name-input">
          <input
            type="text"
            placeholder="Enter task name here."
            value={name}
            onChange={onChangeName}
          />
        </div>
        <div className="description-input">
          <textarea
            value={description}
            onChange={onChangeDescription}
            placeholder="Enter task description here."
          />
        </div>
        <div className="due-date">
          <b>Due:</b>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={onChangeDueDate}
          />
        </div>
        <div>
          <button
            className="create-button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onCreate();
            }}
          >
            Create
          </button>
          <button className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskDetails;