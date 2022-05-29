const express = require("express")
const router = express.Router()

const auth = require("../middlewares/auth")

const users = require("../controllers/user.controller")

router.post("/userPost",users.createUser)
router.post("/login",users.login)
router.get("/userGetAll",users.findAll)
router.get("/userGet/:id",users.findOneUser)
router.get("/userGet/:email , password",users.findMailUser)
router.put("/userUp/:id",users.updateUser)
router.delete("/userDel/:id",users.deleteUser)
router.get("/profile:id",auth,users.profile)








module.exports = router;