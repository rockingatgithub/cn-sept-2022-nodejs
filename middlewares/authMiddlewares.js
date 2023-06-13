exports.authMiddleware = async (req, res, next) => {

    if(req.cookies.user) {

        const studentId = jwt.verify(req.cookies.user, 'mykey')
        const student = await Candidate.findById(studentId.id)

        if(student) {
            next()
        } else {
            return res.status(401).json({message: "Unauthorized"})
        }

    } else {
        return res.status(401).json({message: "Unauthorized"})
    }
}