import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={ [message, messageDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const messgaeAndDispatch = useContext(NotificationContext)
  return messgaeAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const messgaeAndDispatch = useContext(NotificationContext)
  return messgaeAndDispatch[1]
}

export default NotificationContext