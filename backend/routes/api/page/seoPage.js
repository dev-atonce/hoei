const router = require("express").Router();
const controllers = require("../../../controllers/page/seoPage.controller");

router.get("/page-name/:pagename", controllers.onGetByPageName);

module.exports = router;
