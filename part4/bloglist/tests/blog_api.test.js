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

afterAll(async () => {
	await mongoose.connection.close()
})

