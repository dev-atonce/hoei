const router = require("express").Router();
const controllers = require("../../../controllers/page/clientPage.controller");

router.get("/", controllers.onGet);

module.exports = router;
