
const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/usercontroller")
userRouter.post("/register", userController.insertUser);
userRouter.post("/login", userController.checkUser);
module.exports = userRouter;
