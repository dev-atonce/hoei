const router = require("express").Router();
const controllers = require("../../../controllers/page/bannerPage.controller");

router.get("/", controllers.onGet);

module.exports = router;
