import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

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
  if (message === null)
    return null
  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [reviseBlogs, setReviseBlogs] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (reviseBlogs === true) {
      blogService.getAll().then(blogs => {
        blogs.sort((a, b) => a.likes - b.likes)
        setBlogs( blogs )
        setReviseBlogs(false)
      })
    }
  }, [reviseBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => setMessage(null)
      , 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setReviseBlogs(true)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => setMessage(null)
      , 5000)
    } catch (exception) {
      setMessage('missing title or url')
      setTimeout(() => setMessage(null)
      , 5000)
    }
  }

  const updateBlog = async (newBlogObject, id) => {
      const returnedBlog = await blogService.update(newBlogObject, id)
      setReviseBlogs(true)     
      setMessage(`likes of blog ${returnedBlog.title} by ${returnedBlog.author} increased`)
      setTimeout(() => setMessage(null)
      , 5000)
  }

  const deleteBlog = async (blogToDelete) => {
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      try {
        await blogService.remove(blogToDelete.id)
        setReviseBlogs(true)
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
        setMessage(`blog ${blogToDelete.title} by ${blogToDelete.author} removed`)
        setTimeout(() => setMessage(null)
        , 5000)
      } catch (exception) {
        setMessage(`invalid token`)
        setTimeout(() => setMessage(null)
        , 5000)
      }
  }
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
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  if (user === null)
    return loginForm()
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <form onClick={handleLogout}>
        {user.name} logged in
        <button type="click">
          logout
        </button>
      </form>
      <Togglable buttonLable="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App