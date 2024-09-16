const router = require("express").Router();
const controllers = require("../../../controllers/webpanel/bannerPanel.controller");
const auth = require("../../auth");
const validator = require("../../../validators");

router.get("/all/", auth.required, controllers.onGetAll);

router.get("/:id", [auth.required, validator.banner.findById, validator.check], controllers.onGetById);

router.post("/", auth.required, controllers.onInsert);

router.put("/:id", auth.required, controllers.onUpdate);

router.put("/sort/:id", [auth.required, validator.banner.sort, validator.check], controllers.onUpdateSort);

router.put("/status/:id", [auth.required, validator.banner.status, validator.check], controllers.onUpdateStatus);

router.delete("/:id", [auth.required, validator.banner.deleteById, validator.check], controllers.onDelete);

module.exports = router;
