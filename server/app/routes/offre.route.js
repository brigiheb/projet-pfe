const express = require("express")
const router = express.Router()

const auth = require("../middlewares/auth")

const offres = require("../controllers/offre.controller")

router.post("/offrePost",auth,offres.createOffre)
router.get("/offreGetAll",offres.findAll)
router.get("/offreGet/:id",offres.findOneOffre)
router.put("/offreUp/:id",offres.updateOffre)
router.delete("/offreDel/:id",offres.deleteOffre)







module.exports = router;