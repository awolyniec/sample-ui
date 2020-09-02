import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Filters from '../Filters';
import TaskList from '../TaskList';
import TaskDetails from '../TaskDetails';
import NewTaskDetails from '../NewTaskDetails';
import { fetchTasks } from '../../redux/tasks/actions';
import { selectTasks } from '../../redux/tasks/selectors';

import './styles.scss';

const NEW_TASK_KEYWORD = 'new';

const TasksPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('Shatoast');
  const [description, setDescription] = useState('This is a really cool task. I mean, like, really cool. Wow.');
  const [dueDate, setDueDate] = useState(new Date('2020-01-01T00:00:00.000Z'));
  const [isNewTask, setIsNewTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterUpcoming, setFilterUpcoming] = useState(true);
  const [filterToday, setFilterToday] = useState(true);
  const [filterTomorrow, setFilterTomorrow] = useState(true);
  const [filterOverdue, setFilterOverdue] = useState(true);
  const [filterComplete, setFilterComplete] = useState(true);

  const tasks = useSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // ====================
  // HELPER FUNCTIONS
  // ====================

  const selectTask = (_id) => () => setSelectedTask(_id);

  // const taskDetails = [
  //   {
  //     text: 'Do something',
  //     isOverdue: true
  //   },
  //   {
  //     text: 'Do nothing',
  //     isComplete: true,
  //     isDueToday: true
  //   },
  //   {
  //     text: 'Maybe do something',
  //     isDueTomorrow: true
  //   },
  //   {
  //     text: '',
  //     isSelected: true
  //   }
  // ];
  // TODO: add new task to bottom of list
  const taskList = tasks.map(task => {
    const { _id, name, dueDate, isComplete } = task;
    const isOverdue = moment(dueDate).isBefore(new Date());
    const beginningOfToday = moment().startOf('day');
    const beginningOfTomorrow = moment(beginningOfToday).add(1, 'days');
    const beginningOfTwoDaysFromNow = moment(beginningOfTomorrow).add(1, 'days');
    const isDueToday = !isOverdue && moment(dueDate).isSameOrAfter(beginningOfToday) && moment(dueDate).isBefore(beginningOfTomorrow);
    const isDueTomorrow = moment(dueDate).isSameOrAfter(beginningOfTomorrow) && moment(dueDate).isBefore(beginningOfTwoDaysFromNow);
    // TODO: add other action handlers
    return {
      isComplete,
      isDueToday,
      isDueTomorrow,
      isOverdue,
      text: name,
      isSelected: _id === selectedTask,
      onSelect: selectTask(_id)
    };
  });

  let taskDetails = {};
  if (selectedTask && selectedTask !== NEW_TASK_KEYWORD) {
    const selectedTaskObject = tasks.find(task => task._id == selectedTask);
    const { name, description, dueDate } = selectedTaskObject;
    taskDetails = {
      name,
      description,
      dueDate
    };
  }

  return (
    <div className="tasks-page">
      <div className="filters-container">
        <Filters
          upcoming={filterUpcoming}
          today={filterToday}
          tomorrow={filterTomorrow}
          overdue={filterOverdue}
          complete={filterComplete}
        />
      </div>
      <div className="task-list-container">
        <TaskList tasks={taskList} />
      </div>
      <div className="task-details-container">
        {isNewTask ? (
          <NewTaskDetails
            {...{ name, description, dueDate }}
          />
        ) : selectedTask ? (
          <TaskDetails
            {...taskDetails}
          />
        ) : (<></>)}
      </div>
    </div>
  );
};

export default TasksPage;