// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature } = require("../Controllers/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../Middlewares/auth")
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", verifySignature)

module.exports = router