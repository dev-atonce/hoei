const router = require("express").Router();
const controllers = require("../../../controllers/webpanel/userPanel.controller");
const auth = require("../../auth");
const validator = require("../../../validators");

router.get("/", auth.required, controllers.onGetAll);
// tbd
router.get("/check-auth", auth.required, controllers.onCheckAuth);

router.get(
  "/:id",
  [auth.required, validator.user.findById, validator.check],
  controllers.onGetById
);

router.post(
  "/",
  [auth.required, validator.user.create, validator.check],
  controllers.onInsert
);

router.put(
  "/:id",
  [auth.required, validator.user.update, validator.check],
  controllers.onUpdate
);

router.delete(
  "/:id",
  [auth.required, validator.user.deleteById, validator.check],
  controllers.onDelete
);

router.post("/login", controllers.onLogin);
router.post("/register", controllers.onRegister);
router.post("/refresh-token", controllers.onRefreshToken);

module.exports = router;
