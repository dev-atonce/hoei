const router = require("express").Router();
const controllers = require("../../../controllers/webpanel/contactFormPanel.controller");
const auth = require("../../auth");
const validator = require("../../../validators");

router.get("/all/", auth.required, controllers.onGetAll);

router.get("/:id", [auth.required, validator.contactForm.findById, validator.check], controllers.onGetById);

router.put("/status/:id", [auth.required, validator.contactForm.status, validator.check], controllers.onUpdateStatus);

router.delete("/:id", [auth.required, validator.contactForm.deleteById, validator.check], controllers.onDelete);

module.exports = router;
