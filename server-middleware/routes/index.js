const express = require('express')

// Set The Express Router
const router = express.Router()

// Load The Routes
router.use('/user', require('./user'))

// Export Router
module.exports = router