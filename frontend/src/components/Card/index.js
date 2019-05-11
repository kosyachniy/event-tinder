import React from 'react'

export default class Card extends React.Component {

    // constructor(props){
    //
    // }

    render() {
        return (
            <div className="tinder--card">
                <img src={this.props.link}/>
                <h3>{this.props.name}</h3>
                <p>{this.props.location}</p>
                <p>{this.props.time}</p>
            </div>
        )
    }
}
