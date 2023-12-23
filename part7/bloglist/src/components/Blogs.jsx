import { useRef } from 'react'
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

const Blogs = () => {

	const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div>
    <Togglable buttonLable="create new blog" ref={blogFormRef}>
      <BlogForm  blogFormRef={blogFormRef} />
    </Togglable>
    <div>
      {blogs.map(blog =>       
        <Link to={`/blogs/${blog.id}`}  key={blog.id}>
          <div style={blogStyle}>
            {blog.title} {blog.author}
          </div>
        </Link>
      )}
    </div>
  </div>
)}

export default Blogs
