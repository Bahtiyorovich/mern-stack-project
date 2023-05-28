const express = require('express')
const {connect} = require('mongoose')
const {config} = require('dotenv')
const cors = require('cors')
const app = express()

config()

app.use(express.json())
app.use(cors())

// Routers
const Blogs = require('./router/blog.js')
const Students = require('./router/student.js')

app.use('/blogs', Blogs)
app.use('/students', Students)

// MONGODB_CONNECTION
connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected Successfuly'))
    .catch(err => console.log(err))

// MAIN PAGE
app.get('/', (req, res) => {
    res.json('MERN STACK')
}) 

const PORT = process.env.PORT 
app.listen(PORT, () => console.log(`${PORT} - Listening...`))