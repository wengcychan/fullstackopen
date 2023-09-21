import { createAnecdote } from '../request'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newMutationAnecdote = useMutation({ 
    mutationFn: createAnecdote,     
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote))
      dispatch({ type: 'SET_NOTIFICATION', payload: `anecdote '${newAnecdote.content}' added` })
      setTimeout(() => dispatch({ type: 'SET_NOTIFICATION', payload: null })
      , 5000)
    },
    onError: (error) => {
      dispatch({ type: 'SET_NOTIFICATION', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => dispatch({ type: 'SET_NOTIFICATION', payload: null })
      , 5000)     
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newMutationAnecdote.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm