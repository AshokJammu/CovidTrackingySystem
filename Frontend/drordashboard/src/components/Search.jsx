import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props){
        super(props)
        this.state={
            search : ""
        }
    }
    render() {
        const {search} = this.state
        return (
            <div>
                 <input
          type="text"
          onChange={(e) =>
            this.setState({
              search: e.target.value,
            })
          }
          value={search}
        />

        <button>SEARCH</button>
            </div>
        )
    }
}
