const express = require('express')
const path = require('path')
const PORT = 8000
const app = express()
// let counter = 0

app.use(express.urlencoded())

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

const students = [
    {
        name: "abc",
        roll: 34
    },
    {
        name: "abcd",
        roll: 35
    },
    {
        name: "abcde",
        roll: 36
    }
]

// difference between res.send and res.end
app.get('/student', (req, res) => {

    return res.status(200).json({ data: students })

})

app.post('/student', (req, res) => {

    console.log("the body", req.body)
    const updatedStudent = [ ...students, req.body  ]
    return res.status(200).json({ data: updatedStudent })

})

app.put('/student', (req, res) => {

    // console.log("the body", req.body, parseInt(req.params.roll))
    console.log("the body", req.body, parseInt(req.query.roll))

    const roll = parseInt(req.query.roll)

    const index = students.findIndex((student) => student.roll === roll)

    students.splice(index, 1, req.body)

    return res.status(200).json({ data: students })

})


app.listen(PORT, () => {
    console.log("Express is up and running!")
})