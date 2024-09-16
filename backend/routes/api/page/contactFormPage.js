const router = require("express").Router();
const controllers = require("../../../controllers/page/contactFormPage.controller");

router.post("/", controllers.send);

module.exports = router;
