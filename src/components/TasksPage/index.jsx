import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Filters from '../Filters';
import TaskList from '../TaskList';
import TaskDetails from '../TaskDetails';
import NewTaskDetails from '../NewTaskDetails';
import {
  fetchTasks, setCreateTaskConfirmationStatus, createTask, completeTask,
  deleteTask, setCompleteTaskConfirmationStatus, setDeleteTaskConfirmationStatus
} from '../../redux/tasks/actions';
import {
  selectTasks, selectTaskCreationConfirmationStatus, selectTaskCompletionConfirmationStatus,
  selectTaskDeletionConfirmationStatus
} from '../../redux/tasks/selectors';

import './styles.scss';

const NEW_TASK_KEYWORD = 'new';

const TasksPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterUpcoming, setFilterUpcoming] = useState(false);
  const [filterToday, setFilterToday] = useState(false);
  const [filterTomorrow, setFilterTomorrow] = useState(false);
  const [filterOverdue, setFilterOverdue] = useState(false);
  const [filterComplete, setFilterComplete] = useState(false);

  const tasks = useSelector(selectTasks);
  const createTaskConfirmationStatus = useSelector(selectTaskCreationConfirmationStatus);
  const completeTaskConfirmationStatus = useSelector(selectTaskCompletionConfirmationStatus);
  const deleteTaskConfirmationStatus = useSelector(selectTaskDeletionConfirmationStatus);

  const selectedTaskObject = tasks.find(task => task._id == selectedTask);
  const beginningOfToday = moment().startOf('day');
  const beginningOfTomorrow = moment(beginningOfToday).add(1, 'days');
  const beginningOfTwoDaysFromNow = moment(beginningOfTomorrow).add(1, 'days');

  useEffect(() => {
    getTasks();
  }, [dispatch]);

  useEffect(() => {
    if (createTaskConfirmationStatus) {
      setSelectedTask(null);
      dispatch(setCreateTaskConfirmationStatus(null));
      getTasks();
    }
  }, [createTaskConfirmationStatus]);

  useEffect(() => {
    if (completeTaskConfirmationStatus) {
      dispatch(setCompleteTaskConfirmationStatus(null));
      getTasks();
    }
  }, [completeTaskConfirmationStatus]);

  useEffect(() => {
    if (deleteTaskConfirmationStatus) {
      dispatch(setDeleteTaskConfirmationStatus(null));
      getTasks();
    }
  }, [deleteTaskConfirmationStatus]);

  useEffect(() => {
    if (selectedTask && selectedTask !== NEW_TASK_KEYWORD && !selectedTaskObject) {
      setSelectedTask(null);
    }
  }, [JSON.stringify(tasks)]);

  useEffect(() => {
    setSelectedTask(null);
    getTasks();
  }, [filterToday, filterTomorrow, filterOverdue, filterComplete]);

  // ====================
  // HELPER FUNCTIONS
  // ====================

  const getTasks = () => {
    const query = {};
    if (filterComplete) {
      query.isComplete = true;
    }
    let dueDateStart = null;
    let dueDateEnd = null;
    // if overdue, set query.dueDateEnd to now
    if (filterOverdue) {
      query.dueDateEnd = new Date().toISOString();
    }
    if (filterToday) {
      query.dueDateStart = beginningOfToday.toISOString();
      query.dueDateEnd = beginningOfTomorrow.toISOString();
    }
    if (filterTomorrow) {
      if (!query.dueDateStart) {
        query.dueDateStart = beginningOfTomorrow.toISOString();
      }
      query.dueDateEnd = beginningOfTwoDaysFromNow.toISOString();
    }
    dispatch(fetchTasks(query));
  };

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

  const toggleUpcomingFilter = () => {
    if (filterUpcoming) {
      setFilterToday(false);
      setFilterTomorrow(false);
    } else {
      setFilterOverdue(false);
    }
    setFilterUpcoming(!filterUpcoming);
  };

  const toggleTodayFilter = () => {
    setFilterToday(!filterToday);
  };

  const toggleTomorrowFilter = () => {
    setFilterTomorrow(!filterTomorrow);
  };

  const toggleOverdueFilter = () => {
    if (!filterOverdue) {
      setFilterUpcoming(false);
      setFilterToday(false); // TODO: refactor
      setFilterTomorrow(false);
    }
    setFilterOverdue(!filterOverdue);
  };

  const toggleCompleteFilter = () => {
    setFilterComplete(!filterComplete);
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
    const isDueToday = !isOverdue && moment(dueDate).isSameOrAfter(beginningOfToday) && moment(dueDate).isBefore(beginningOfTomorrow);
    const isDueTomorrow = moment(dueDate).isSameOrAfter(beginningOfTomorrow) && moment(dueDate).isBefore(beginningOfTwoDaysFromNow);
    return {
      isComplete,
      isDueToday,
      isDueTomorrow,
      isOverdue,
      text: name,
      isSelected: _id === selectedTask,
      onSelect: selectTask(_id),
      onComplete: () => dispatch(completeTask(_id)),
      onDelete: () => dispatch(deleteTask(_id))
    };
  });

  if (newTaskInProgress()) {
    taskList.push({
      text: name,
      isSelected: true,
      onSelect: () => {},
      onComplete: () => {},
      onDelete: () => setSelectedTask(null)
    });
  }

  let taskDetails = {};
  if (selectedTaskObject) {
    const { _id, name, description, dueDate, isComplete } = selectedTaskObject;
    taskDetails = {
      name,
      description,
      dueDate,
      isComplete,
      onComplete: () => dispatch(completeTask(_id)),
      onDelete: () => dispatch(deleteTask(_id))
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
          onToggleUpcoming={toggleUpcomingFilter}
          onToggleToday={toggleTodayFilter}
          onToggleTomorrow={toggleTomorrowFilter}
          onToggleOverdue={toggleOverdueFilter}
          onToggleComplete={toggleCompleteFilter}
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
            onDelete={() => setSelectedTask(null)}
          />
        ) : selectedTaskObject ? (
          <TaskDetails
            {...taskDetails}
          />
        ) : (<></>)}
      </div>
    </div>
  );
};

export default TasksPage;