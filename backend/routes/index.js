const router = require("express").Router();
const config = require("../configs/app");

router.use(`/api/v1`, require("./api"));

module.exports = router;
