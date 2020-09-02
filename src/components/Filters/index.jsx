import React from 'react';

import './styles.scss';

const Filters = (props) => {
  const {
    upcoming, today, tomorrow, overdue, complete,
    onToggleUpcoming, onToggleToday, onToggleTomorrow,
    onToggleOverdue, onToggleComplete
  } = props;
  return (
    <div className="filters">
      <h3>Filter by date:</h3>
      <div>
        <input
          type="checkbox"
          id="upcomingCheckbox"
          value="true"
          onChange={onToggleUpcoming}
        />
        <label for="upcomingCheckbox">Upcoming</label>
      </div>
      {upcoming && (
        <div className="upcoming-selections">
          <div>
            <input
              type="checkbox"
              id="todayCheckbox"
              value="true"
              onChange={onToggleToday}
            />
            <label for="todayCheckbox">Today</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="tomorrowCheckbox"
              value="true"
              onChange={onToggleTomorrow}
            />
            <label for="tomorrowCheckbox">Tomorrow</label>
          </div>
        </div>
      )}
      <div>
        <input
          type="checkbox"
          id="overdueCheckbox"
          value="true"
          onChange={onToggleOverdue}
        />
        <label for="overdueCheckbox">Overdue</label>
      </div>
      <h3>Other filters:</h3>
      <div>
        <input
          type="checkbox"
          id="completedCheckbox"
          value="true"
          onChange={onToggleComplete}
        />
        <label for="completedCheckbox">Only show completed tasks</label>
      </div>
    </div>
  );
};

export default Filters;