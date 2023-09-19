import { useSelector, useDispatch } from 'react-redux'
import { addVote, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  const anecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(newAnecdote))
  }

  const byVotes = (a, b) => b.votes - a.votes

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(byVotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={anecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App