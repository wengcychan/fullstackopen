import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Display = ({anecdotes, votes}) => {
  return (
    <div>
      <p>{anecdotes}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setVote] = useState(Array(anecdotes.length).fill(0))

  const setToSelected = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const setToVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setVote(copy)
  }

  const maxVoteIndex = points.indexOf(Math.max(...points))

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Display anecdotes={anecdotes[selected]} votes={points[selected]}/>
      <Button text="vote" handleClick={() => setToVote()}/>
      <Button text="next anecdote" handleClick={() => setToSelected()}/>
      <Header text="Anecdote with most votes"/>
      <Display anecdotes={anecdotes[maxVoteIndex]} votes={points[maxVoteIndex]}/>
    </div>
  )
}

export default App
