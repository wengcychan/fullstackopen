import { useEffect } from 'react'
import Blogs from './components/Blogs'
import Users from './components/Users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  if (user === null) return <LoginForm />

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <form onClick={handleLogout}>
        {user.name} logged in
        <button type="click">logout</button>
      </form>
      <Router>
        <Routes>
          <Route path="/" element={<Blogs />}/>
          <Route path="/users" element={<Users />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
