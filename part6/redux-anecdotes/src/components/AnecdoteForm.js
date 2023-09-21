import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const anecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(showNotification(`you added '${content}'`))
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
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