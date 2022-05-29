const express = require("express")
const router = express.Router()
const role = require('../controllers/role.controlleur');

router.get('/find',role.findAll)

module.exports = router