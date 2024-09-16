const router = require("express").Router();
const controllers = require("../../../controllers/webpanel/seoPanel.controller");
const auth = require("../../auth");

router.get("/", auth.required, controllers.onGetAll);
router.put("/:id", auth.required, controllers.onUpdate);

module.exports = router;
