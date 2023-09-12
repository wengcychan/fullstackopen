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
	expect(titles).toContain('New blog')
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
	const targetBlog = blogAtEnd.find(blog => blog.title === newBlog.title)

	expect(targetBlog.likes).toBe(0)
})

afterAll(async () => {
	await mongoose.connection.close()
})

