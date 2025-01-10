const jwt = require('jsonwebtoken')
const Student = require('../models/student-model')

const authMiddleware = async(req,res,next)=>{
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    // console.log(token)
    if (!token){
        return res
        .status(401)
        .json({msg:"Unauthoried HTTP, token not provided"})
    }

    try {
        const isVerified = jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log("Token from middleware",isVerified)

        const studentData = await Student.findOne({studentID:isVerified.studentID})
        console.log(studentData)

        req.student = studentData
        req.token = token
        
        next()
    } catch (error) {
        return res
        .status(401)
        .json({msg:"Unauthorized token"})
    }

}
module.exports = authMiddleware