import api from './api'


// Получить карточки

export function getCard(that, data={}) {
	const handlerSuccess = (other, res) => {
		other.setState({cards: res['events']})
	}

	api(that, 'get', data, handlerSuccess)
}