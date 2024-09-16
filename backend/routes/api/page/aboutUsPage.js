const router = require("express").Router();
const controllers = require("../../../controllers/page/aboutUsPage.controller");

router.get("/:type", controllers.onGet);

module.exports = router;
