//server  create krna means server create kese hoga uska logic yehn likhenge 
//server ko config krna 

const express = require('express');
const app = express(); //server create hogya but isse start server.js file m krenge

app.use(express.json()); //yeh middleware kaam krta h req.body m data ko json m convert krne ka

const notes = [
   
];

app.get('/', (req, res) => {
    res.send("this is Notes practise minor task...");
});

//post notes
app.post('/notes', (req, res) => {
    console.log(req.body);
    notes.push(req.body);
    res.send('post request is working, Notes created!');  } ) 

//Get notes   
app.get('/notes', (req, res)=>{
    res.send(notes);
})

//patch notes
app.patch('/notes/:index', (req, res)=>{
    console.log(req.params.index)
    notes[req.params.index].description = req.body.description;
    res.send('note updated successfully');
   });

//delete note
////params
app.delete('/notes/:index', (req, res)=>{
    console.log(req.params.index)
    delete notes[req.params.index];
    res.send('note deleted successfully');
   })

module.exports = app; //server ko export krdia taki server.js file m use kr ske
