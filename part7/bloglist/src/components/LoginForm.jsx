import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import Notification from './Notification'

const LoginForm = () => {

	const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

	const dispatch = useDispatch()

	const handleLogin = async (event) => {
    event.preventDefault()

		dispatch(loginUser(username, password))
		setUsername('')
		setPassword('')
  }

	return (
    <div>
      <h1>log in to application</h1>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm