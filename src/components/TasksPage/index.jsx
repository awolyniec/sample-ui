import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Filters from '../Filters';
import TaskList from '../TaskList';
import TaskDetails from '../TaskDetails';
import NewTaskDetails from '../NewTaskDetails';
import { fetchTasks, setCreateTaskConfirmationStatus, createTask, completeTask } from '../../redux/tasks/actions';
import { selectTasks, selectTaskCreationConfirmationStatus } from '../../redux/tasks/selectors';

import './styles.scss';

const NEW_TASK_KEYWORD = 'new';

const TasksPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterUpcoming, setFilterUpcoming] = useState(true);
  const [filterToday, setFilterToday] = useState(true);
  const [filterTomorrow, setFilterTomorrow] = useState(true);
  const [filterOverdue, setFilterOverdue] = useState(true);
  const [filterComplete, setFilterComplete] = useState(true);

  const tasks = useSelector(selectTasks);
  const createTaskConfirmationStatus = useSelector(selectTaskCreationConfirmationStatus);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (createTaskConfirmationStatus) {
      setSelectedTask(null);
      dispatch(setCreateTaskConfirmationStatus(null));
      dispatch(fetchTasks());
    }
  }, [createTaskConfirmationStatus]);

  // TODO: when deleting selected task, make sure it gets unselected

  // ====================
  // HELPER FUNCTIONS
  // ====================

  const newTaskInProgress = () => selectedTask === NEW_TASK_KEYWORD;

  const selectTask = (_id) => () => setSelectedTask(_id);

  const clearNewTaskFields = () => {
    setName(null);
    setDescription(null);
    setDueDate(null);
  }

  const onClickNewTaskButton = () => {
    if (newTaskInProgress()) { // can't create more than one new task at a time
      return;
    }
    clearNewTaskFields();
    setSelectedTask(NEW_TASK_KEYWORD);
  };

  const changeName = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setName(event.target.value);
  };

  const changeDescription = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDescription(event.target.value);
  };

  const changeDueDate = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDueDate(event.target.value);
  };

  const validateNewTask = () => {
    return !!name;
  };

  const createNewTask = () => {
    if (!validateNewTask()) {
      return;
    }
    const body = {
      name,
      description,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null // store in ISO; display in local timezone
    };
    dispatch(createTask(body));
  };

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
      onSelect: selectTask(_id),
      onComplete: () => dispatch(completeTask(_id))
    };
  });

  if (newTaskInProgress()) {
    taskList.push({
      text: name,
      isSelected: true,
      onSelect: () => {}
    });
  }

  let taskDetails = {};
  if (selectedTask && selectedTask !== NEW_TASK_KEYWORD) {
    const selectedTaskObject = tasks.find(task => task._id == selectedTask);
    const { _id, name, description, dueDate, isComplete } = selectedTaskObject;
    taskDetails = {
      name,
      description,
      dueDate,
      isComplete,
      onComplete: () => dispatch(completeTask(_id))
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
        <TaskList
          tasks={taskList}
          onClickNew={onClickNewTaskButton}
        />
      </div>
      <div className="task-details-container">
        {newTaskInProgress() ? (
          <NewTaskDetails
            {...{ name, description, dueDate }}
            onChangeName={changeName}
            onChangeDescription={changeDescription}
            onChangeDueDate={changeDueDate}
            onCreate={createNewTask}
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