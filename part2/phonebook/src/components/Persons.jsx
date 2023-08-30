const Person = ({ person }) => <div>{person.name} {person.number}</div>

const Persons = ({ persons, filterName }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().match(RegExp(`.*${filterName.toLowerCase()}.*`)))
  return (
    <div>
      {filteredPersons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  )
}

export default Persons