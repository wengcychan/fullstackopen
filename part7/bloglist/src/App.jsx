import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, insertBlog, removeBlog, addLikes } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const Notification = ({ message }) => {
  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null) return null
  return <div style={messageStyle}>{message}</div>
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
      dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(insertBlog(blogObject))
  }

  const updateBlog = async (newBlogObject, id) => {
    dispatch(addLikes(newBlogObject, id))
  }

  const deleteBlog = async (blogToDelete) => {
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`))
        dispatch(removeBlog(blogToDelete))
  }

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <Notification message={message} />
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

  if (user === null) return loginForm()
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <form onClick={handleLogout}>
        {user.name} logged in
        <button type="click">logout</button>
      </form>
      <Togglable buttonLable="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          user={user}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )
}

export default App
