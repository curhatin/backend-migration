const express = require("express");
const router = express.Router();
const controller = require("./controller");
const helpers = require("../helpers");


router.get("/search", controller.search);
router.get("/", helpers.isAuthenticated,controller.getAll);
router.get("/:id", controller.getOne);
router.post("/login",controller.login)
router.post("/register", controller.post);
router.delete("/:id", controller.deleteOne);
router.delete("/", controller.deleteAll);
router.put("/:id", controller.update);
router.get("/find", controller.findId);
module.exports = router;