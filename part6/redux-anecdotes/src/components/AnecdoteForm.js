import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const anecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    dispatch(showNotification(`you added '${newAnecdote}'`))
    event.target.anecdote.value = ''
    dispatch(createAnecdote(newAnecdote))
    setTimeout(() => dispatch(showNotification(null))
    , 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={anecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm