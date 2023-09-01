const CountryList= ({ countries }) => {
	if (countries === null)
		return <div>Please fill in the filter</div>	
	else if (countries.length === 0) 
		return <div>No matches</div>
	else if (countries.length === 1)
	  	return null
	else if (countries.length > 10)
	  	return <div>Too many matches, specify another filter</div>
	else
	  	return <div>{countries.map(country => <div key={country}>{country}</div>)}</div>
}

export default CountryList