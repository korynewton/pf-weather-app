import React from 'react';
import './index.css';

class SearchBar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      search: ''
    };
  }

  updateState = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { search } = this.state;
    this.props.coordsFromName(search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <form className="inputForm" onSubmit={e => this.onSubmit(e)}>
        <label>
          Location Search:
          <input
            onChange={e => this.updateState(e)}
            value={this.state.search}
            type="text"
            name="search"
          />
        </label>
        <input className="btn" type="submit" value="Submit" />
      </form>
    );
  }
}

export default SearchBar;
