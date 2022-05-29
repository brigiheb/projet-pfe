const express = require("express")
const router = express.Router()


const candidature_library = require("../controllers/candidature_library.controller")

router.get("/candidature_libraryGetAll",candidature_library.findAll)
router.post("/candidature_libraryPost",candidature_library.createCandidature_library)








module.exports = router;