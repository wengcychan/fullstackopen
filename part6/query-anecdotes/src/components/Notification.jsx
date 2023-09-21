import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const messgae = useNotificationValue()

  if (!messgae)
    return null

  return (
    <div style={style}>
      {messgae}
    </div>
  )
}

export default Notification
