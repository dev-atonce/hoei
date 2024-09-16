const router = require("express").Router();
const controllers = require("../../../controllers/webpanel/clientPanel.controller");
const auth = require("../../auth");
const validator = require("../../../validators");

router.get("/all/", auth.required, controllers.onGetAll);

router.get("/:id", [auth.required, validator.client.findById, validator.check], controllers.onGetById);

router.post("/", auth.required, controllers.onInsert);

router.put("/:id", [auth.required, validator.client.findById, validator.check], controllers.onUpdate);

router.put("/sort/:id", [auth.required, validator.client.sort, validator.check], controllers.onUpdateSort);

router.put("/status/:id", [auth.required, validator.client.status, validator.check], controllers.onUpdateStatus);

router.delete("/:id", [auth.required, validator.client.deleteById, validator.check], controllers.onDelete);

module.exports = router;
