const express = require("express");
const noteModel = require('./models/note.model');

const app = express();
const cors = require('cors')
const path = require('path');

app.use(cors())

app.use(express.json());
app.use(express.static("./public"))//iss middle ware se backend ki url frontend bhi diikhane lgti hai uske pass css and js dono file bhi hai
//ab frontend bhi backend pe deploy hone lga
//express.static yeh public name ke folder ke and sabhi files ko publicaly accessible bna deta
//jab iske pass req aaegi http://localhost:3000/assets/index-BTOTGOgN.js  aur iss file ko res mains end kr dete
//agr in files ke name m koi bhi gdbd hui to req uss gadbad wali url pe jaegi and wo milegi nhi then yeh middle ware req hamara wild card pe bhej deta 
// now hum frontned nad backend dono  ko sath m chla rhe 
///and dono ko sath m deploy bhi kr skte

// isse seekhne se ab hume alg alg deploy nhi krna pdega cost bchegi hamari



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
app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))//file system mainn kahan exist krti wo pura absolute path dena pdega uyahan
})//this is wild card api 
//__dirname ka mtlb poora path dega jis bhi file m tum isse use kr rhe wo file jis folder main hai uss folder tk ka path
//__dir src tk ka path diya ".." means folder se bhr aagye 
// index.html tk ka path kyon de rhe ?

//yahan wild card req pe html file mil but js and css bhi milni chhie 
//so for that we have to use another middle wareup add kiya hai dekho 
module.exports = app;