const express = require("express");
const router = express.Router();
const controller = require("./controller");
router.get("/search", controller.search);
router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/login",controller.login)
router.post("/register", controller.post);
router.delete("/:id", controller.deleteOne);
router.delete("/", controller.deleteAll);
router.put("/:id", controller.update);
router.get("/find", controller.findId);
module.exports = router;