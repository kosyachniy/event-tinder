import axios from 'axios'
import { server } from '../params'

function serverRequest(method, json={}) {
	return axios.post(server.link + method, json)
}

function handlerResult(that, res, handlerSuccess, handlerError) {
	handlerSuccess(that, res)

	// if (res['error']) {
	// 	handlerError(that, res)
	// } else {
	// 	handlerSuccess(that, res)
	// }
}

export default function api(that, method, params={}, handlerSuccess=(res)=>{console.log(res)}, handlerError=(res)=>{console.log(res)}) {
	// let json = {
	// 	'method': method,
	// 	'params': params,
	// }

	// json['language'] = localStorage.getItem('lang')
	// json['token'] = JSON.parse(localStorage.getItem('user')).token

	serverRequest(method, params).then((res) => handlerResult(that, res.data, handlerSuccess, handlerError))
}
