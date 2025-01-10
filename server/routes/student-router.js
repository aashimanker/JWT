const express = require('express')

const router = express.Router()

const studentController = require('../controller/student-controller')
const authMiddleware = require('../middleware/student-middleware')
router.route("/register").post(studentController.register)
router.route("/user").get(authMiddleware,studentController.user)
module.exports = router