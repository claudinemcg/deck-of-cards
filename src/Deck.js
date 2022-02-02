import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css'

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
        const cards = this.state.drawn.map(c => (
            <Card key={c.id} name={c.name} image={c.image}/>
            ));
                
        return (
            <div className='Deck'>
                <h1 className='Deck-title'>&#9671; Card Dealer &#9671;</h1>
                <h2 className='Deck-title subtitle'>&#9671; Made with React &#9671;</h2>
                <button className="Deck-btn" onClick={this.getCard}>Get Card!</button>
                <div className='Deck-cardarea'>{cards}</div>
            </div>
        )
    }
}

export default Deck;
