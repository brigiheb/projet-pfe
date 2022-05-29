const express = require("express")
const router = express.Router()


const valid = require("../controllers/valid.controller")

router.post("/validPost",valid.createValid)
router.get("/validGetAll",valid.findAll)
router.get("/validGet/:id",valid.findOneValid)
router.put("/validUp/:id",valid.updateValid)
router.delete("/validDel/:id",valid.deleteValid)







module.exports = router;