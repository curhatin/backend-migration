const express = require("express");
const router = express.Router();
const controller = require("./controller");
const helpers = require("../helpers");

router.get("/search", controller.search);
router.get("/", helpers.isAuthenticated,controller.getAll);
router.get("/:id", controller.getOne);
router.post("/login",controller.login)
router.post("/",helpers.isAuthenticated, controller.post);
router.delete("/:id", controller.deleteOne);
router.delete("/", controller.deleteAll);
router.get("/all/:id", controller.getBoth);

module.exports = router;