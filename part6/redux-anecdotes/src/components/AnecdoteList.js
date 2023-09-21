import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter === null 
      ? anecdotes 
      : anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })

	const dispatch = useDispatch()
  
	const vote = (anecdote) => {
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    dispatch(addVote(anecdote.id))
	}
  
	const byVotes = (a, b) => b.votes - a.votes

  const sortedAnecdotes = [...anecdotes].sort(byVotes);

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList