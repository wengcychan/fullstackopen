const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

const api = supertest(app)

test('all notes are returned as json', async () => {
	const response = await api.get('/api/blogs')
		.expect('Content-Type', /application\/json/)

	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property is named id', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body[0].id).toBeDefined()
})

test('a blog is added', async () => {
	const newBlog = {
		title: 'New blog',
		author: 'New author',
		url: 'https://newblog.com/',
		likes: 15
	}

	await api
		.post('/api/blogs')
		.send(newBlog)

	const blogAtEnd = await helper.blogsInDb()

	expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)

	const titles = blogAtEnd.map(blog => blog.title)
	expect(titles).toContain(newBlog.title)
})

test('default value of likes is 0', async () => {
	const newBlog = {
		title: 'New blog',
		author: 'New author',
		url: 'https://newblog.com/',
	}

	await api
		.post('/api/blogs')
		.send(newBlog)

	const blogAtEnd = await helper.blogsInDb()

	expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)

	const targetBlog = blogAtEnd.find(blog => blog.title === newBlog.title)
	expect(targetBlog.likes).toBe(0)
})

test('status code 400 is returned if the title is missing', async() => {
	const newBlog = {
		author: 'New author',
		url: 'https://newblog.com/',
		likes: 10
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	const blogAtEnd = await helper.blogsInDb()
	expect(blogAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('status code 400 is returned if the url is missing', async() => {
	const newBlog = {
		title: 'New blog',
		author: 'New author',
		likes: 10
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	const blogAtEnd = await helper.blogsInDb()
	expect(blogAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog is deleted', async() => {
	const blogAtStart = await helper.blogsInDb()
	const blogToDelete = blogAtStart[0]

	await api
		.delete(`/api/blogs/${blogToDelete.id}`)
		.expect(204)

	const blogAtEnd = await helper.blogsInDb()

	expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1)

	const titles = blogAtEnd.map(blog => blog.title)

	expect(titles).not.toContain(blogToDelete.title)
})

test('a blog is updated', async() => {
	const blogAtStart = await helper.blogsInDb()
	const blogToUpdated = blogAtStart[0]

	const updatedBlog = { ...blogToUpdated, likes: 8 }

	await api
		.put(`/api/blogs/${blogToUpdated.id}`)
		.send(updatedBlog)

	const blogAtEnd = await helper.blogsInDb()

	expect(blogAtEnd).toHaveLength(helper.initialBlogs.length)

	expect(blogAtEnd[0].likes).toBe(8)
})

afterAll(async () => {
	await mongoose.connection.close()
})
