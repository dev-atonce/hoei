const router = require("express").Router();
const controllers = require("../../../controllers/webpanel/logoPanel.controller");
const auth = require("../../auth");
const validator = require("../../../validators");

router.get("/all/", auth.required, controllers.onGetAll);

router.put("/:type", [auth.required, validator.logo.type, validator.check], controllers.onUpdate);

router.delete("/:type", [auth.required, validator.logo.type, validator.check], controllers.onDelete);

module.exports = router;
