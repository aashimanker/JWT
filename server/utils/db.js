const mongoose = require('mongoose')


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Succesful connection to Database")
    } catch (error) {
        console.log("Failed connection to Database")
    }
}

module.exports = connectDB