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

const authMiddleware = async (req, res, next) => {

    console.log(req.cookies.user)

    if(req.cookies.user) {

        const studentId = jwt.verify(req.cookies.user, 'mykey')
        const student = await Candidate.findById(studentId)

        if(student) {
            next()
        } else {
            return res.status(401).json({message: "Unauthorized"})
        }

    } else {
        return res.status(401).json({message: "Unauthorized"})
    }

    


}


// middlewares...

// const requestCounter = (req, res, next) => {

//     counter++
//     console.log("The request number", counter)
//     if(counter < 10) {
//         return res.json({ message: "Please pay some money!" })
//     } else {
//         next()
//     }


// }

// app.use( requestCounter )


// CRUD API with student data

// difference between res.send and res.end
app.get('/student', authMiddleware, async (req, res) => {

    const students = await Candidate.find({})
    return res.status(200).json({ data: students })

})

app.post('/student', async (req, res) => {

    console.log("the body", req.body )
    const student = await Candidate.create(req.body)
    return res.status(200).json({ data: student })

})

app.put('/student/:email', authMiddleware, async (req, res) => {

    // console.log("the body", req.body, parseInt(req.params.roll))

    const student = await Candidate.findOneAndUpdate({ email: req.params.email },
        req.body, { new: true }
        )

    return res.status(200).json({ data: student })

})

app.post('/auth/local', async (req, res) => {

    console.log(req.body)
    const student = await Candidate.findOne({email: req.body.email, password: req.body.password})

    if(student) {
        const token = jwt.sign(student.id, 'mykey', { expiresIn: '24h' })
        res.cookie('user', token)
        return res.status(200).json({message: "User authenticated successfully!", user: student })
    }

    return res.status(401).json({ message: "User not found!"})

})


app.listen(PORT, () => {
    console.log("Express is up and running!")
})