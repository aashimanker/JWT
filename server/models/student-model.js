const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({
    studentID:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    isGraduated:{
        type:Boolean,
        required:true,
        default:false
    }
})
studentSchema.methods.generateToken = async function() {
    try {
        const token = jwt.sign({
            studentID: this.studentID,
            email: this.email,
            name:this.name,
            year:this.year
             //payload
        },
        process.env.JWT_SECRET_KEY,//secret key
        {
            expiresIn:'30d'
        } 
    )
    return token
    } catch (error) {
        console.log("Error occured in generating token ",error)
    }
}
const Student = mongoose.model("Student",studentSchema)

module.exports = Student