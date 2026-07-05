const express = require("express");
const app = express();
const noteModel = require("./models/notes.model");

app.use(express.json());//middleware jo ki request body ko json m convert kr dega

app.post("/notes", async(req, res) => {
    const { title, description } = req.body;

    const note = await noteModel.create({ title , description });
    //yeh note create krke database m store kr dega but usme time lgega so i use await and async
    res.status(201).json({ 
        message: "Note created successfully", 
        note //database m jo note data store hua hai wo data aya hai yeh database se.
    });

app.get("/notes", async function (req, res) {
        const notes = await noteModel.find(); //yeh database m se sabhi notes ko find krke laega
        res.status(200).json({
            message: "Notes fetched successfully",
            notes
        })//body m jo data aya usse destructure krke title aur description m store kr liya
//as i told that in server.js file that we cannot perform any crud operation untill we have model so i import model here
    })
   
});

app.get("/notes", async function (req, res) {
        const notes = await noteModel.find(); //yeh database m se sabhi notes ko find krke laega
        res.status(200).json({ //find always return array of object so we can use array method on it
            message: "Notes fetched successfully",
            notes
        })
    })

module.exports = app;