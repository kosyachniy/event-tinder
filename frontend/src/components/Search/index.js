import React from 'react'

import './style.css'


export default class Search extends React.Component {
	render() {
		return (
			<div className="search">
				<input onChange={(_search) => {this.props.handlerSearch(_search.target.value)}} />
			</div>
		)
	}
}