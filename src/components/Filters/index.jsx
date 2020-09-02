import React from 'react';

import './styles.scss';

const Filters = (props) => {
  const { upcoming, today, tomorrow, overdue, complete } = props;
  return (
    <div className="filters">
      <h3>Filter by date:</h3>
      <input type="checkbox" id="upcomingCheckbox" value="true" />
      <label for="upcomingCheckbox">Upcoming</label>
      {upcoming && (
        <div className="upcoming-selections">
          <div>
            <input type="checkbox" id="todayCheckbox" value="true" />
            <label for="todayCheckbox">Today</label>
          </div>
          <div>
            <input type="checkbox" id="tomorrowCheckbox" value="true" />
            <label for="tomorrowCheckbox">Tomorrow</label>
          </div>
        </div>
      )}
      <input type="checkbox" id="overdueCheckbox" value="true" />
      <label for="overdueCheckbox">Overdue</label>
    </div>
  );
};

export default Filters;