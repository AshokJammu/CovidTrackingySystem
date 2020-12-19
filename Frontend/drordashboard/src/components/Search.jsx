import React, { Component } from "react";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  render() {
    const { search } = this.state;
    return (
      
      <div class="alert alert-primary">
        <form class="d-flex col-4">
          <input
            class="form-control me-2"
            type="search"
            aria-label="Search"
            value={search}
            onChange={(e) =>
              this.setState({
                search: e.target.value,
              })
            }
            placeholder="search by name & locality"
          />

          <button
            onClick={this.handleSearch}
            class="btn btn-outline-success my-2 my-sm-0"
          >
            search
          </button>
        </form>
      </div>
    );
  }
}
