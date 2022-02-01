import React, { Component } from 'react';
import axios from 'axios';
const API_BASE_URL = 'https://www.deckofcardsapi.com/api/deck'

class Deck extends Component {
    constructor(props) {
        super(props)
        this.state = { deck: null }
        this.getCard = this.getCard.bind(this);
    }

    
    async componentDidMount() {
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        console.log(deck.data)
        this.setState({deck: deck.data})
    }

    async getCard() {
        // make request using deck_id
        let id = this.state.deck.deck_id
        let cardUrl = `${API_BASE_URL}/${id}/draw/`;
        let cardResponse = await axios.get(cardUrl);
        console.log(cardResponse.data)
        // set state using new card info
        let card = cardResponse.data.cards[0]; //in data
        this.setState(st => ({
            drawn: [
                ...st.drawn, // what's already in state
                {
                    id: card.code,
                    image: card.image,
                    name: `${card.suit} ${card.value}`
                }
            ]
        }));
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
