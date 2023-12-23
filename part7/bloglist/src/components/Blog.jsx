import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, addLikes } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleUpdate = () => {
    const newUpdatedObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    dispatch(addLikes(newUpdatedObject, blog.id))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
        dispatch(removeBlog(blog))
  }

  const showRemove = () => (
    <div>
      <button onClick={handleDelete}>remove</button>
    </div>
  )

  return (
    <div style={blogStyle} className="blog">
      <div className="blogInfo">
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={toggleVisibility}>
          view
        </button>
        <button style={showWhenVisible} onClick={toggleVisibility}>
          hide
        </button>
      </div>
      <div style={showWhenVisible} className="blogDetails">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={handleUpdate}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div>{blog.user.username === user.username && showRemove()}</div>
      </div>
    </div>
  )
}

export default Blog
