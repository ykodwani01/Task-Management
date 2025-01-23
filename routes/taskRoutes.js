const express = require("express");
const router = express.Router()

const {getTask,getTasks,postTask,deleteTask,putTask} = require("../controllers/taskControllers")
const authenticateToken = require("../middleware/auth");


router.get("/",authenticateToken,getTasks);
router.get("/:taskid",authenticateToken,getTask);
router.post("/",authenticateToken,postTask);
router.put("/:taskid", authenticateToken,putTask);
router.delete("/:taskid", authenticateToken,deleteTask);

module.exports = router;