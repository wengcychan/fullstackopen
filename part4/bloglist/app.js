const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRoute = require('./controllers/blogs')
const userRoute = require('./controllers/users')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRoute)
app.use('/api/users', userRoute)

app.use(middleware.errorHandler)

module.exports = app