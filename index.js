const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const PORT = 8000
const app = express()
const db = require('./config/mongoose')
const Candidate = require('./model/candidate')
// let counter = 0

// middlewares
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())

// difference between res.send and res.end

app.use('/', require('./router'))

app.listen(PORT, () => {
    console.log("Express is up and running!")
})