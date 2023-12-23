import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
  
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog({ title, author, url }))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="write title here"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write author here"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="write url here"
          />
        </div>
        <div>
          <button type="submit" id="create-button">
            create
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
