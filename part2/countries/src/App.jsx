import { useState, useEffect } from 'react'
import CountryContent from './components/CountryContent'
import CountryList from './components/CountryList'
import countrySerive from './services/country'

const App = () => {

  const [country, setCountry] = useState('')
  const [allCountryNames, setAllCountryNames] = useState([])
  const [printCountryNames, setPrintCountryNames] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countryContent, setCountryContent] = useState(null)
  const [foundCountry, setFoundCountry] = useState(false)


  const getAllCountries = () => {
    countrySerive
      .getAll()
      .then(allCountryContent => {
        setAllCountryNames(allCountryContent.map(country => country.name.common))
      })
  }
  useEffect(getAllCountries, [])


  const getSelectedCountry = () => {
    if (selectedCountry)
    {
      countrySerive
        .getSelected(selectedCountry)
        .then(content => {
          setCountryContent(content)
        })
    }
  }
  useEffect(getSelectedCountry, [selectedCountry])


  const handleCountry = (event) => {

    setCountry(event.target.value)

    if (event.target.value.length === 0)
      setPrintCountryNames(null)
    else {
      const filterCountries = allCountryNames.filter(country => country.toLowerCase().includes(event.target.value.toLowerCase()))
      setPrintCountryNames(filterCountries)

      if (filterCountries.length === 1 && foundCountry === false) {
        setSelectedCountry(filterCountries[0])
        setFoundCountry(true)
      }
      else if (filterCountries.length !== 1) {
        setSelectedCountry(null)
        setCountryContent(null)
        setFoundCountry(false)
      }
    }
  }


  const handleShow = ( countryName )=> {
    setSelectedCountry(countryName)
    setPrintCountryNames([countryName])
  }

  
  return (
    <div>
      <div>
        find countries
        <input value={country} onChange={handleCountry}/>
        <CountryList countries={printCountryNames} handleShow={handleShow}/>
        <CountryContent countryContent={countryContent}/>
      </div>
    </div>
  )
}

export default App
