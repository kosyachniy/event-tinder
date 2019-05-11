import React from 'react'

import { getCard } from '../func/methods'

export default class Cards extends React.Component {
	state = {
		cards: [1, 2, 3],
	}

	componentDidMount() {
		getCard(this)
	}

	render() {
		return (
			<div>
				{ JSON.stringify(this.state.cards) }
			</div>
		)
	}
}