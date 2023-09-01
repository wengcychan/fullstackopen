import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
	const response = axios.get(`${baseUrl}/all`)
	return response.then(response => response.data)
}

const getSelected = country => {
	const response = axios.get(`${baseUrl}/name/${country.toLowerCase()}`)
	return response.then(response => response.data)
}

export default { getAll, getSelected }