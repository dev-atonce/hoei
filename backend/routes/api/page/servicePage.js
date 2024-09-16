const router = require("express").Router();
const controllers = require("../../../controllers/page/servicePage.controller");

router.get("/", controllers.onGet);

router.get("/:id", controllers.onGetById);

module.exports = router;
