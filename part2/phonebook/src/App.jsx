import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [messageName, setMessageName] = useState(null)

  const hook = () => {

    phonebookService
      .getAll()
      .then(initalPhoneBook => {
        setPersons(initalPhoneBook)
      })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault();

    const targetPerson = persons.find((person) => person.name === newName)
    if (targetPerson) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {...targetPerson, number: newNumber}
        
        phonebookService
          .update(targetPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setMessageName(returnedPerson.name)
            setTimeout(() => setMessageName(null), 5000)
          })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      phonebookService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessageName(returnedPerson.name)
          setTimeout(() => setMessageName(null), 5000)
        })
    }

    setNewName('')
    setNewNumber('')
    setFilterName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }

  const handleDetele = ( name, id ) => {
    if (confirm(`Delete ${name} ? `)) {
      phonebookService
        .remove(id)
        .then()
      setPersons(persons.filter(n => n.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification name={messageName}/>
      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <h2>Add New</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2> 
      <Persons persons={persons} filterName={filterName} handleDetele={handleDetele}/>
    </div>
  )
}

export default App