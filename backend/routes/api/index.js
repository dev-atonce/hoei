const router = require("express").Router();

//// page ////
router.use("/page/service", require("./page/servicePage"));
router.use("/page/seo", require("./page/seoPage"));
router.use("/page/banner", require("./page/bannerPage"));
router.use("/page/about-us", require("./page/aboutUsPage"));
router.use("/page/client", require("./page/clientPage"));
router.use("/page/contact-lists", require("./page/contactListPage"));
router.use("/page/contact-forms", require("./page/contactFormPage"));
router.use("/page/logo", require("./page/logoPage"));

//////////////

// webpanel //
router.use("/webpanel/service", require("./webpanel/servicePanel"));
router.use("/webpanel/seo", require("./webpanel/seoPanel"));
router.use("/webpanel/users", require("./webpanel/userPanel"));
router.use("/webpanel/log", require("./webpanel/logPanel"));
router.use("/webpanel/banner", require("./webpanel/bannerPanel"));
router.use("/webpanel/media", require("./webpanel/mediaPanel"));
router.use("/webpanel/about-us", require("./webpanel/aboutUsPanel"));
router.use("/webpanel/client", require("./webpanel/clientPanel"));
router.use("/webpanel/contact-forms", require("./webpanel/contactFormPanel"));
router.use("/webpanel/contact-lists", require("./webpanel/contactListPanel"));
router.use("/webpanel/logo", require("./webpanel/logoPanel"));

//////////////

module.exports = router;
