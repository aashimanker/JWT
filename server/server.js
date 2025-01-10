require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())

const connectDB = require('./utils/db')

const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET ,POST ,HEAD, PATCH ,PUT, DELETE",
    credentials:true
}
app.use(cors(corsOptions))

const studentRouter = require('./routes/student-router')

app.use("/api/student",studentRouter)

PORT = 5000

connectDB().then(app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
}))