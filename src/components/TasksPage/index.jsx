import React, { useState } from 'react';

import TaskList from '../TaskList';
import TaskDetails from '../TaskDetails';
import NewTaskDetails from '../NewTaskDetails';

import './styles.scss';

const TasksPage = () => {
  const [name, setName] = useState('Shatoast');
  const [description, setDescription] = useState('This is a really cool task. I mean, like, really cool. Wow.');
  const [dueDate, setDueDate] = useState(new Date('2020-01-01T00:00:00.000Z'));
  const [isNewTask, setIsNewTask] = useState(true);

  const taskDetails = [
    {
      text: 'Do something',
      isOverdue: true
    },
    {
      text: 'Do nothing',
      isComplete: true,
      isDueToday: true
    },
    {
      text: 'Maybe do something',
      isDueTomorrow: true
    },
    {
      text: '',
      isSelected: true
    }
  ];

  return (
    <div className="tasks-page">
      <div className="filters-container">

      </div>
      <div className="task-list-container">
        <TaskList tasks={taskDetails} />
      </div>
      <div className="task-details-container">
        {isNewTask ? (
          <NewTaskDetails
            {...{ name, description, dueDate }}
          />
        ) : (
          <TaskDetails
            {...{ name, description, dueDate }}
          />
        )}
      </div>
    </div>
  );
};

export default TasksPage;