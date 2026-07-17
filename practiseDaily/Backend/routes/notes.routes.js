const express = require("express");
const notesRouter = express.Router();
const notesModel = require('../models/notes.model')
const notesController = require('../controllers/notes.controllers')

notesRouter.post('/post-data',notesController.notes_postController)
notesRouter.get('/get-data',notesController.notes_getController) 
 
notesRouter.delete('/delete-data/:id',notesController.notes_deleteController) 
notesRouter.patch('/update-data/:id',notesController.notes_updateController) 



module.exports=notesRouter