import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('<Blog /> only renders title and author, but not the URL or number of likes by default', () => {
  const blog = {
    title: 'New blog',
    author: 'New author',
    url: 'https://newblog.com/',
    user: '1',
    likes: 15
  }

  const user = {
    username: 'test',
    name: 'test',
    password: '12345'
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const element = container.querySelector('.blog')

  expect(element).toHaveTextContent('New blog')
  expect(element).toHaveTextContent('New author')
  expect(element).not.toHaveTextContent('https://newblog.com/')
  expect(element).not.toEqual(15)
})