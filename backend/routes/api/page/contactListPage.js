const router = require("express").Router();
const controllers = require("../../../controllers/page/contactListPage.controller");

router.get("/", controllers.onGet);

module.exports = router;
