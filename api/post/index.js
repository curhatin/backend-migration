const express = require("express");
const router = express.Router();
const controller = require("./controller");
const helpers = require("../helpers");

router.get("/account-id",helpers.isAuthenticated, controller.getById)
router.get("/search", controller.search);
router.get("/", helpers.isAuthenticated,controller.getAll);
router.get("/:id",helpers.isAuthenticated, controller.getOne);
router.post("/login",controller.login)
router.post("/",helpers.isAuthenticated, controller.post);
router.delete("/:id", helpers.isAuthenticated,controller.deleteOne);
router.delete("/", controller.deleteAll);
router.get("/all/:id", controller.getBoth);
router.put("/:id", helpers.isAuthenticated, controller.update);
module.exports = router;