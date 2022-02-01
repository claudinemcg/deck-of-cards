import React, { Component } from 'react';


class Card extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = { imgUrl: "", name: "" }
    // }

    async componentDidMount() {

        const url = `https://api.github.com/users/${this.props.username}`;
        let response = await axios.get(url);
        console.log(response.data)
        this.setState({ imgUrl: response.data.avatar_url, name: response.data.name })
    }


    render() {
        return (
            <div>
                <h1>GITHUB USER INFO</h1>
                <img src={this.state.imgUrl} />
                <h2>{this.state.name}</h2>
            </div>
        )
    }
}

export default Card;
