const { Router } = require("express");
const todoRouter = require("./todos")
const userRouter = require("./users")
const listRouter = require("./lists")

const router = Router()

router.use(userRouter);
router.use(todoRouter);
router.use(listRouter);

module.exports = router;