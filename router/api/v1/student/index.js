const express = require('express')
const { authMiddleware } = require('../../../../middlewares/authMiddlewares')
const Candidate = require('../../../../model/candidate')
const router = express.Router()

router.get('/', authMiddleware ,async (req, res) => {

    const students = await Candidate.find({})
    return res.status(200).json({ data: students })

})

router.post('/',  async (req, res) => {

    console.log("the body", req.body )
    const student = await Candidate.create(req.body)
    return res.status(200).json({ data: student })

})

router.put('/:email',authMiddleware , async (req, res) => {

    const student = await Candidate.findOneAndUpdate({ email: req.params.email },
        req.body, { new: true }
        )

    return res.status(200).json({ data: student })

})

module.exports = router