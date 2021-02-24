
// Require The Express Framework
const express = require('express')
const userController = require('../controllers/user')
var user = new userController()
// Set The Express Router
const router = express.Router();

// Create The Routes
router.get('/', (req, res) => {
    user.list(req.query, res)
})
router.get('/:id', (req, res) => {
    user.detail(req.params.id, res)
})
router.post('/', (req, res) => {
    user.store(req.body, res)
})

router.put('/:id', (req, res) => {
    user.update(req.body, req.params.id, res)
})

router.delete('/:id', (req, res) => {
    user.destroy(req.params.id, res)
})

// Export the Router
module.exports = router