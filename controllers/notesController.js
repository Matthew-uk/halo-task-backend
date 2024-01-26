const expressAsyncHandler = require("express-async-handler");
const notesModel = require("./../models/noteModel");

const handleCreateNote = expressAsyncHandler(async (req, res) => {
  const { title, description, userId, starred, bgColor } = req.body;
  const newNote = await notesModel.create({
    title,
    description,
    userId,
    starred,
    bgColor,
  });
  res.status(200).json(newNote);
});

const handleGetNote = expressAsyncHandler(async (req, res) => {
  const { id } = req.query;
  const note = await notesModel.find({ userId: id });
  res.status(200).json(note);
});

const handleStarred = expressAsyncHandler(async (req, res) => {
  const { id } = req.query;
  try {
    const note = await notesModel.findOneAndUpdate(
      { _id: id },
      { starred: true },
      { new: true }
    );
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = { handleCreateNote, handleGetNote, handleStarred };
