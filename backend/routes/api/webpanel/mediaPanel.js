const router = require("express").Router();
const controllers = require("../../../controllers/webpanel/mediaPanel.controller");
const auth = require("../../auth");
const validator = require("../../../validators");

router.get("/service/:id", [auth.required, validator.service.findById, validator.check], controllers.onGetServiceById);
router.post("/service/:id", [auth.required, validator.service.findById, validator.check], controllers.onInsertService);

router.get("/about-us", auth.required, controllers.onGetAboutUsById);
router.post("/about-us", auth.required, controllers.onInsertAboutUs);

router.get("/home", auth.required, controllers.onGetHomeById);
router.post("/home", auth.required, controllers.onInsertHome);

router.delete("/", auth.required, controllers.onDeleteMedia);

module.exports = router;
