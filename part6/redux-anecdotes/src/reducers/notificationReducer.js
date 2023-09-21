import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		showNotification(state, action) {
			return action.payload
		}
	}
})

export const { showNotification } = notificationSlice.actions

export const setNotification = ( message, second ) => {
	return async dispatch => {
		dispatch(showNotification(message))
		setTimeout(() => dispatch(showNotification(null))
		, second * 1000)
	}
}

export default notificationSlice.reducer