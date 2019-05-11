import React from 'react'

import './style.css'

export default class Card extends React.Component {

    // constructor(props){
    //
    // }

    render() {
        return (
            <div className="tinder--card">
                <img src={this.props.link}/>
                <h3>{this.props.name}</h3>
                <div className="inline"><i className="fas fa-map-marker-alt"></i>{Math.floor(Math.random()*100)} км</div>
                <div className="inline"><i class="fas fa-calendar-week"></i>{this.props.time}</div>
            </div>
        )
    }
}
