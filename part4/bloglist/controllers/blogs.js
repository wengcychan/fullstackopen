const blogRoute = require('express').Router()
const Blog = require('../models/blog')

blogRoute.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRoute.post('/', async (request, response) => {
	const body = request.body

	if (!body.title || !body.url)
		response.status(400).end()
	else {

		if (!body.likes)
			body.likes = 0

		const blog = new Blog(body)

		const savedBlog = await blog.save()
		response.status(201).json(savedBlog)
	}
})

module.exports = blogRoute