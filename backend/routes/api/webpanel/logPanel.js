const router = require("express").Router();
const controllers = require("../../../controllers/webpanel/logPanel.controller");
const auth = require("../../auth");

router.get("/", controllers.onGetAll);
router.get("/:id", controllers.onGetById);
router.post("/", controllers.onInsert);
router.put("/", controllers.onUpdate);
// router.delete("/:id", controllers.onDelete);

module.exports = router;
