import React from 'react';
import SingleDay from './SingleDay';

const SevenDayForecast = ({ daily, weeklySummary }) => {
  return (
    <div className="sevenDayForecast">
      <h3>{weeklySummary}</h3>
      {daily.map(day => (
        <SingleDay key={day.time} day={day} />
      ))}
    </div>
  );
};
export default SevenDayForecast;
