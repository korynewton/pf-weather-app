import React from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
class App extends React.Component {
  state = {
    isPolling: false,
    locationName: '',
    latitude: '',
    longitude: ''
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

  render() {
    return (
      <div>
        <SearchBar coordsFromName={this.coordsFromName} />
        <button onClick={this.getLatLon}>test</button>
      </div>
    );
  }
}

export default App;
