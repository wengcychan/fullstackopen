const CountryContent = ({ countryContent, weather }) => {
	if (countryContent === null || weather === null)
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
		  <h2>Weather in {countryContent.capital[0]}</h2>
		  <div>temperature {weather.main.temp} Celcius</div>
		  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
		  <div>wind {weather.wind.speed} m/s</div>
		</div>
	)}
}

export default CountryContent
