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
                <div>{Math.floor(Math.random()*100)} км</div>
                <div>{this.props.time}</div>
            </div>
        )
    }
}
