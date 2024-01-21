const { default: mongoose } = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    userId: {
      type: String,
      required: true,
    },
    starred: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", notesSchema);
