import React from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
class App extends React.Component {
  state = {
    isPolling: false,
    locationName: '',
    latitude: '',
    longitude: '',
    weatherData: {}
  };

  componentDidMount() {
    const { isPolling } = this.state;
    if (isPolling) {
      this.pollingMechanism = setInterval(() => this.getItems(), 1000 * 60);
    }
  }

  componentWillUnmount() {
    // clear pollingMechanism when unmounted
    this.pollingMechanism = null;
  }

  updateData() {
    console.log('updating data');
    // todo:
    // fetch weather at darksky endpoint
    // update state
  }

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
            this.reverseGeoLocate(coords.latitude, coords.longitude)
          );
        },
        err => console.log(err),
        options
      );
    }
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
    const { latitude, longitude } = this.state;
    const url = `https://pf-dark-sky-proxy.herokuapp.com/api/weather?latitude=${latitude}&longitude=${longitude}`;
    axios
      .get(url)
      .then(res => {
        const { currently, daily } = res.data;
        const weatherData = { currently, daily };
        this.setState({ weatherData });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <SearchBar coordsFromName={this.coordsFromName} />
        <button onClick={this.currentLocationCoords}>
          Use Current Location
        </button>
        <button onClick={this.retrieveWeather}>Get weather</button>
      </div>
    );
  }
}

export default App;
