import { useState } from 'react'

const Number = ({ person }) => <div>{person.name} {person.number}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName))
      alert(`${newName} is already added to phonebook`)
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
    setFilter('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter show with <input 
                          value={filter}
                          onChange = {handleFilterName}  
                        />
      </div>
      <h2>Add New</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
                  value={newName}
                  onChange={handleNameChange}
                />
        </div>
        <div>number: <input 
                      value={newNumber}
                      onChange={handleNumberChange}
                    />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter((person) => person.name.toLowerCase().match(RegExp(`.*${filter.toLowerCase()}.*`))).map((person) => <Number key={person.name} person={person}/>)}
    </div>
  )
}

export default App