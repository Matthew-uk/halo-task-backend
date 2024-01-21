const expressAsyncHandler = require("express-async-handler");
const taskModel = require("./../models/taskModel");

const createTask = expressAsyncHandler(async (req, res) => {
  const { taskName, taskDescription, userId, date, important } = req.body;
  try {
    const newTask = await taskModel.create({
      taskName,
      taskDescription,
      userId,
      date,
      important,
    });
    res.status(200).json({
      status: "Success",
      message: "Task Created",
      newTask,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      status: "fail",
      message: "Task Creation Failed. Please Try Again...",
    });
  }
});

const getTask = expressAsyncHandler(async (req, res) => {
  const id = req.query?.id;
  const userTasks = await taskModel.find({ userId: id });
  res.status(200).json({
    message: "Fetching Single task",
    id,
    userTasks,
  });
});

const updateTask = expressAsyncHandler(async (req, res) => {
  const { id } = req.query;
  const updateData = { pending: false };
  const currentTask = await taskModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  res.status(200).json({ id, currentTask });
});

module.exports = { createTask, getTask, updateTask };
