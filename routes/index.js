const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello Get')
})

router.post('/', (req, res) => {
    res.send('Hello Post')
})

module.exports = router