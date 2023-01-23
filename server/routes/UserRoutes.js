const express = require('express');
const userRouter = express.Router();

const { getAllUsers,signup,login } = require('../controllers/User_Controllers');

userRouter.get("/", getAllUsers );
userRouter.post("/signup", signup)
userRouter.post("/login", login)


module.exports = userRouter