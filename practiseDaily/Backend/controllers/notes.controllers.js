const notesModel = require("../models/notes.model");

async function notes_postController(req, res) {
  const { title, description, priority } = req.body;
  const note = await notesModel.create({
    title: title,
    description: description,
    priority: priority,
  });

  res.status(201).json({
    message: "note created successFully! ",
    note,
  });
}

async function notes_getController(req, res) {
  const notes = await notesModel.find();
  res.status(200).json({
    message: "here is your requested data...",
    notes,
  });
}

async function notes_deleteController(req, res) {
  const note = await notesModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "note deleted succesfully!",
    note,
  });
}

async function notes_updateController(req, res) {
  const { title, description } = req.body;
  const note = await notesModel.findByIdAndUpdate(req.params.id, {
    title: title,
    description: description,
  }, {
    new: true,
  });

  res.status(200).json({
    message: "note updated succesfully!",
    note,
  });
}

module.exports = {
  notes_postController,
  notes_getController,
  notes_deleteController,
  notes_updateController,
};
