const express = require("express");
const router = express.Router();
const controller = require("./controller");
const helpers = require("../helpers");


router.get("/:id", helpers.isAuthenticated,controller.getOne)
router.get("/search", controller.search);
router.get("/", helpers.isAuthenticated,controller.getAll);

router.post("/login",controller.login)
router.post("/add",helpers.isAuthenticated, controller.post);
router.delete("/:id", controller.deleteOne);
router.delete("/", controller.deleteAll);

router.put("/:id", controller.update);
// router.get("/find", controller.find);
module.exports = router;