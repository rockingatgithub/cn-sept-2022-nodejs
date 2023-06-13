const express = require('express')
const jwt = require('jsonwebtoken')
const Candidate = require('../../../../model/candidate')
const router = express.Router()

router.use('/jwt', async (req, res) => {

    console.log(req.body)
    const student = await Candidate.findOne({email: req.body.email, password: req.body.password})

    const data = {id: student.id}

    if(student) {
        const token = jwt.sign(data, 'mykey', {expiresIn: '24h'})
        res.cookie('user', token)
        return res.status(200).json({message: "User authenticated successfully!", user: student })
    }

    return res.status(401).json({ message: "User not found!"})

})

module.exports = router