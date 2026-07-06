const express = require("express");
const noteModel = require('./models/note.model');

const app = express();
const cors = require('cors')
app.use(cors())

app.use(express.json());

//create new note and save data in mongodb
app.post('/api/notes', async(req, res)=>{
    const {title , description}=req.body;
    const note = await noteModel.create({
        title : title,
        description : description
    })

    res.status(201).json({
        message:"note created !",
        note
    })
})

//database se data fetch krne m time lgta so await use kiya

app.get('/api/notes',async(req, res)=>{
    const note = await noteModel.find()
    res.status(200).json({
        message : "here is you data..",
        note
    })
})

app.delete('/api/notes/:id', async (req, res) => {

    const id = req.params.id;

    const deletedNote = await noteModel.findByIdAndDelete(id);

    if (!deletedNote) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    res.status(200).json({
        message: "Note deleted successfully",
        deletedNote
    });

});

app.patch('/api/notes/:id',async(req,res)=>{
      const id = req.params.id;
      const {description} = req.body
      const updatedNote = await noteModel.findByIdAndUpdate(id, {description} ,{ new: true })

       if (!updatedNote) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    res.status(200).json({
        message: "Note updated successfully",
        updatedNote})
      
})

module.exports = app;