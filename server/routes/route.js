const { Router } = require("express");
const todoRouter = require("./todos")
const userRouter = require("./users")
const listRouter = require("./lists")

const router = Router()

router.use("/", todoRouter);
router.use("/", listRouter);
router.use("/", userRouter);

module.exports = router;