import React, { Component } from 'react';


class Deck extends Component {
    constructor(props) {
        super(props)
        this.state = { imgUrl: "", name: "" }
    }

    render() {
        return (
            <div>
                <h1>Card Dealer</h1>
                {/* <img src={this.state.imgUrl} /> */}
                {/* <h2>{this.state.name}</h2> */}
            </div>
        )
    }
}

export default Deck;
