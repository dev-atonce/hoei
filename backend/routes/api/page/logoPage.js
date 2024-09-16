const router = require("express").Router();
const controllers = require("../../../controllers/page/logoPage.controller");

router.get("/:type", controllers.onGet);

module.exports = router;
