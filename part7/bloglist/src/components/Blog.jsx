import { useDispatch, useSelector } from 'react-redux'
import { addLikes } from '../reducers/blogReducer'
import { useMatch } from 'react-router-dom'

const Blog = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null
  
  if(!blog)
    return null

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

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes <button onClick={handleUpdate}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
