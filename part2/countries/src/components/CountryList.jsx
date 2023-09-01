const Country = ({ country, handleShow={handleShow} }) => (
	<div>
		{country} <button onClick={handleShow}>show</button>
	</div>
)

const CountryList = ({ countries, handleShow }) => {
	if (countries === null)
		return <div>Please fill in the country</div>	
	else if (countries.length === 0) 
		return <div>No matches</div>
	else if (countries.length === 1)
	  	return null
	else if (countries.length > 10)
	  	return <div>Too many matches, specify another filter</div>
	else
	  	return <div>{countries.map(country => <Country key={country} country={country} handleShow={() => handleShow(country)}/>)}</div>
}

export default CountryList