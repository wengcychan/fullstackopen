const blogRoute = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRoute.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
	response.json(blogs)
})

blogRoute.post('/', async (request, response) => {
	const body = request.body

	if (!body.title || !body.url)
		return response.status(400).end()

	if (!body.likes)
		body.likes = 0

	const user = await User.findOne()

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		user: user.id,
		likes: body.likes
	})

	const savedBlog = await blog.save()

	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogRoute.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogRoute.put('/:id', async (request, response) => {
	const { title, author, url, likes } = request.body

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes }, { new : true })
	response.json(updatedBlog)
})

module.exports = blogRoute