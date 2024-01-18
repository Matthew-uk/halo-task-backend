const express = require("express");
const userRouter = express.Router();
const { signUp, login, getUser } = require("./../controllers/userController");
const { createTask, getTask } = require("./../controllers/taskController");

const { protect } = require("./../middlewares/protect");

// userRouter.get("/user", async (req, res) => {
//   res.status(200).json({
//     status: 200,
//     message: "This is from the user Route",
//   });
// });

userRouter.route("/register").post(signUp);
userRouter.route("/login").post(login);
userRouter.route("/user").get(protect, getUser);
userRouter.route("/task").post(protect, createTask).get(protect, getTask);

module.exports = { userRouter };
