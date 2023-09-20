import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter === null 
      ? anecdotes 
      : anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })

	const dispatch = useDispatch()
  
	const vote = (id) => {
	  dispatch(addVote(id))
	}
  
	const byVotes = (a, b) => b.votes - a.votes

  return (
    <div>
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
    </div>
  )
}

export default AnecdoteList