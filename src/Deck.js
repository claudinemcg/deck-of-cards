import React, { Component } from 'react';
import axios from 'axios';
const API_BASE_URL = 'https://www.deckofcardsapi.com/api/deck/
const shuffle = '

class Deck extends Component {
    constructor(props) {
        super(props)
        this.state = { deck: null }
        this.getCard = this.getCard.bind(this);
    }

    
    async componentDidMount() {
        let response = await axios.get(`${API_BASE_URL}new/shuffle`);
        console.log(response.data)
        this.setState({deck: response.data})
    }

    getCard() {
        https://www.deckofcardsapi.com/api/deck/
        // make request using deck_id
        let request = await axios.get(`${API_BASE_URL}${deck.deck_id}/draw/}`);
        // set state using new card info
    }
        render() {
        return (
            <div>
                <h1>Card Dealer</h1>
                <button onClick={this.getCard}>Get Card!</button>
            </div>
        )
    }
}

export default Deck;
