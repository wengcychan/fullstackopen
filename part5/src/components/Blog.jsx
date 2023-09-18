import { useState } from 'react'

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

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
    updateBlog(newUpdatedObject, blog.id)
  }

  const handleDelete = () => {
    deleteBlog(blog)
  }

  const showRemove = () => (
    <div>
      <button onClick={handleDelete}>remove</button>
    </div>
  )

  return (
    <div style={blogStyle}>
      <div className="blogInfo">
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      </div>
      <div style={showWhenVisible} className="blogDetails">
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleUpdate}>like</button></div>
        <div>{blog.user.name}</div>
        <div>{blog.user.username === user.username && showRemove()}</div>
      </div>
    </div>
  )}

export default Blog