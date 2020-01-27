import React from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import DisplayWeather from './components/DisplayWeather/DisplayWeather';
class App extends React.Component {
  state = {
    isPolling: false,
    locationName: '',
    latitude: '',
    longitude: '',
    weatherData: null
  };

  componentWillUnmount() {
    // clear pollingMechanism when unmounted
    this.pollingMechanism = null;
    this.setState({ isPolling: false });
  }

  startPolling = () => {
    // retrieve new weather data every minute until component unmounts
    const { isPolling } = this.state;
    if (isPolling) {
      this.pollingMechanism = setInterval(
        () => this.retrieveWeather(),
        1000 * 60
      );
    }
  };

  coordsFromName = text => {
    // format string sent from search box and search with Google maps API
    // sets state with locationName, latitude and longitude
    const transformedText = text.trim().replace(/\s/g, '%20');
    const { REACT_APP_GOOGLE_API_KEY } = process.env;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?&address=${transformedText}&component=geometry&key=${REACT_APP_GOOGLE_API_KEY}`;

    axios
      .get(url)
      .then(res => {
        const { formatted_address, geometry } = res.data.results[0];
        this.setState({
          locationName: formatted_address,
          latitude: geometry.location.lat,
          longitude: geometry.location.lng
        });
      })
      .catch(err => console.log(err));

    // retrieve weather data and begin polling
    this.retrieveWeather();
  };

  currentLocationCoords = () => {
    // Retrieves and sets state with the coordinates of users device
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    if (navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.setState(
            {
              latitude: coords.latitude,
              longitude: coords.longitude
            },
            // get location name from coordinates
            this.reverseGeoLocate(coords.latitude, coords.longitude)
          );
        },
        err => console.log(err),
        options
      );
    }

    // retrieve weather data and begin polling
    this.retrieveWeather();
  };

  reverseGeoLocate = (lat, lng) => {
    // sets locationName on state afer looking up with coordinates using Google Maps API
    const { REACT_APP_GOOGLE_API_KEY } = process.env;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${REACT_APP_GOOGLE_API_KEY}`;
    axios
      .get(url)
      .then(res => {
        const { address_components } = res.data.results[0];
        const name = address_components[0].long_name;
        this.setState({ locationName: name });
      })
      .catch(err => console.log(err));
  };

  retrieveWeather = () => {
    console.log('retrieving weather');
    const { latitude, longitude, isPolling } = this.state;
    const url = `https://pf-dark-sky-proxy.herokuapp.com/api/weather?latitude=${latitude}&longitude=${longitude}`;
    axios
      .get(url)
      .then(res => {
        const { currently, daily } = res.data;
        const weatherData = { currently, daily };
        console.log(weatherData);
        this.setState({ weatherData });
      })
      .catch(err => console.log(err));

    if (!isPolling) {
      this.setState({ isPolling: true }, () => this.startPolling());
    }
  };

  render() {
    const { weatherData, locationName } = this.state;
    return (
      <div className="App">
        <SearchBar coordsFromName={this.coordsFromName} />
        <button onClick={this.currentLocationCoords}>
          Use Current Location
        </button>
        {weatherData ? (
          <DisplayWeather
            weatherData={weatherData}
            locationName={locationName}
          />
        ) : (
          <h1>Enter a Location or choose current location</h1>
        )}
      </div>
    );
  }
}

export default App;
