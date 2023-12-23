import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = () => {

	const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()

  return (
  <div>
    <Togglable buttonLable="create new blog" ref={blogFormRef}>
      <BlogForm  blogFormRef={blogFormRef} />
    </Togglable>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
      />
    ))}
  </div>
)}

export default Blogs
