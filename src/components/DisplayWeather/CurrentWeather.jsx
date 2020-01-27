import React from 'react';

const CurrentWeather = ({ currently, locationName }) => {
  return (
    <div className="currently">
      <h3>{locationName}</h3>
      <h4>{Math.round(currently.temperature)}&deg; F</h4>
      <h5>{currently.summary}</h5>
    </div>
  );
};

export default CurrentWeather;
