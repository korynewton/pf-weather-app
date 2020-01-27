import React from 'react';
import SingleDay from './SingleDay';

const SevenDayForecast = ({ daily, weeklySummary }) => {
  return (
    <div className="sevenDayContainer">
      <h3>Summary of the Week: {weeklySummary}</h3>
      <div className="sevenDayForecast">
        {daily.map(day => (
          <SingleDay key={day.time} day={day} />
        ))}
      </div>
    </div>
  );
};
export default SevenDayForecast;
