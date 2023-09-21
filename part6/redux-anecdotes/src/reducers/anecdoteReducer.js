import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    setVote(state, action) {
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { setVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const anecdoteToChange = state.anecdotes.find(anecdote => anecdote.id === id)
    const changedAnecdotes = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
    await anecdoteService.updateVote(changedAnecdotes, id)
    dispatch(setVote(changedAnecdotes))
  }
}

export default anecdoteSlice.reducer