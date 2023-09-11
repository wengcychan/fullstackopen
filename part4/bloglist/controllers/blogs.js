const blogRoute = require('express').Router()
const Blog = require('../models/blog')

blogRoute.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRoute.post('/', (request, response) => {
	const blog = new Blog(request.body)

	const savedBlog = blog.save()
	response.status(201).json(savedBlog)
})

module.exports = blogRoute