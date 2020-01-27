import React from 'react';
import CurrentWeather from './CurrentWeather';
import SevenDayForecast from './SevenDayForecast';
import './index.css';

const DisplayWeather = ({ locationName, weatherData }) => {
  const { currently, daily } = weatherData;
  return (
    <div className="weatherContainer">
      <CurrentWeather locationName={locationName} currently={currently} />
      <SevenDayForecast daily={daily.data} weeklySummary={daily.summary} />
    </div>
  );
};

export default DisplayWeather;
