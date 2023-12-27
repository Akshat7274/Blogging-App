const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const colors = require('colors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

dotenv.config()

// Object Creation
const app = express()

// Database Connection
connectDB()

// Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// Routing
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/blogs", blogRoutes)

// Listener
const port = process.env.PORT
app.listen(port,() => {
    console.log(`Server running on Port ${port}`.bgBlue)
})