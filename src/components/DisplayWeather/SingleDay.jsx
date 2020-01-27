import React from 'react';

const SingleDay = ({ day }) => {
  const date = new Date(day.time * 1000);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  return (
    <div className="singleDay">
      <h5>{daysOfWeek[date.getDay()]}:</h5>
      <h5>{day.summary}</h5>
      <h5>High: {Math.round(day.temperatureHigh)} &deg; F</h5>
      <h5>Low: {Math.round(day.temperatureLow)} &deg; F</h5>
    </div>
  );
};

export default SingleDay;
