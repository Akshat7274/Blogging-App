const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const colors = require('colors')
const connectDB = require('./config/db')

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
app.get("/",(req,res) => {
    res.status(200).send("Hello Server!!")
})

// Listener
const port = process.env.PORT
app.listen(port,() => {
    console.log(`Server running on Port ${port}`.bgBlue)
})