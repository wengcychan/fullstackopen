const blogRoute = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRoute.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
	response.json(blogs)
})

blogRoute.post('/', async (request, response) => {
	const body = request.body

	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken.id)
		return response.status(401).json({ error: 'token invalid' })

	if (!body.title || !body.url)
		return response.status(400).end()

	if (!body.likes)
		body.likes = 0

	const user = await User.findById(decodedToken.id)

	console.log('user', user)
	console.log('user id', user.id)
	console.log('user _id', user._id)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		user: user.id,
		likes: body.likes
	})

	const savedBlog = await blog.save()

	console.log('savedBlog', savedBlog)

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