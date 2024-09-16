const router = require("express").Router();
const controllers = require("../../../controllers/webpanel/servicePanel.controller");
const auth = require("../../auth");
const validator = require("../../../validators");

router.get("/all/", auth.required, controllers.onGetAll);

router.get("/:id", [auth.required, validator.service.findById, validator.check], controllers.onGetById);

router.post("/", auth.required, controllers.onInsert);

router.put("/:id", [auth.required, validator.service.findById, validator.check], controllers.onUpdate);

router.put("/sort/:id", [auth.required, validator.service.sort, validator.check], controllers.onUpdateSort);

router.put("/status/:id", [auth.required, validator.service.status, validator.check], controllers.onUpdateStatus);

router.delete("/:id", [auth.required, validator.service.deleteById, validator.check], controllers.onDelete);

router.delete("/gallery/:position/:id", [auth.required, validator.service.deleteGallery, validator.check], controllers.onDeleteGallery);

module.exports = router;
