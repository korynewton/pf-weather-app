import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    isPolling: false
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

  render() {
    return <h1>hello world</h1>;
  }
}

export default App;
