import React, { Component } from 'react';
import axios from 'axios';
const API_BASE_URL = 'https://www.deckofcardsapi.com/api/deck'

class Deck extends Component {
    constructor(props) {
        super(props)
        this.state = { deck: null, drawn: [] }
        this.getCard = this.getCard.bind(this);
    }

    
    async componentDidMount() {
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        this.setState({deck: deck.data })
    }

    async getCard() {
        // make request using deck_id
        let deck_id = this.state.deck.deck_id
        try {
            let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
            let cardResponse = await axios.get(cardUrl);
            if (!cardResponse.data.success) { // from API data success is false when no cards are left
                throw new Error ("No cards left!")
            }
            console.log(cardResponse.data);
            // set state using new card info
            let card = cardResponse.data.cards[0]; //in data
            this.setState(st => ({
                drawn: [
                    ...st.drawn, // what's already in state
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit} `
                    }
                ]
            }));
        } catch (err) {
            alert(err);
        }
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
