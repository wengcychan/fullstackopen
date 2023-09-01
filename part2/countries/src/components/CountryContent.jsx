const CountryContent = ({ countryContent }) => {
	if (countryContent === null)
	  return null
	else {
	  const languages = Object.values(countryContent.languages)
	  return (
		<div>
		  <h1>{countryContent.name.common}</h1>
		  <div>capital {countryContent.capital}</div>
		  <div>area {countryContent.area}</div>
		  <h4>languages: </h4>
		  <ul>
			{languages.map(language => <li key={language}>{language}</li>)}
		  </ul>
		  <img src={countryContent.flags.png} alt={countryContent.flags.alt}/>
		</div>
	)}
}

export default CountryContent
