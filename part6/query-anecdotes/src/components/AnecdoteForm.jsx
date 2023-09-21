import { createAnecdote } from '../request'
import { useMutation, useQueryClient } from '@tanstack/react-query'


const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newMutationAnecdote = useMutation({ 
    mutationFn: createAnecdote,     
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote))
    }}
  )

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length >= 5)
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
