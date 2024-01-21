const expressAsyncHandler = require("express-async-handler");
const notesModel = require("./../models/noteModel");

const handleCreateNote = expressAsyncHandler(async (req, res) => {
  const { title, description, userId, starred } = req.body;
  const newNote = await notesModel.create({
    title: title,
    description: description,
    userId,
    starred,
  });
  res.status(200).json(newNote);
});

const handleGetNote = expressAsyncHandler(async (req, res) => {
  const { id } = req.query;
  const note = await notesModel.find({ userId: id });
  res.status(200).json(note);
});

module.exports = { handleCreateNote, handleGetNote };
