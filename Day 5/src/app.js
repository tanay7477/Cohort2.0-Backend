const express = require('express'); //server ko import krdia taki server.js file m use kr ske

const app = express(); //express ko call krdia taki server.js file m use kr ske
app.use(express.json()); //yeh middleware kaam krta h req.body m data ko json m convert krne ka

const notes = []

app.get('/notes', (req, res)=>{
    res.status(200).json({
        notes: notes,
        message: 'server is running !'
    })
});

app.post('/notes', (req, res)=>{
    notes.push(req.body);
    res.status(201).json({
        message: 'note created!'
    })
})

// app.get('/notes', (req, res)=>{
//     res.send(notes);
// })

app.delete('/notes/:index',(req, res)=>{
    delete notes[req.params.index];
    res.status(200).json({
        message: 'note deleted !'
        })
})

// app.get('/notes/:index',(req, res)=>{
//     res.send(notes[req.params.index].description[1]);
// })

app.patch('/notes/:index',(req, res)=>{
    notes[req.params.index].description = req.body.description;
    res.status(200).json({
        message: 'data updated !'
    });
})

// app.put('/notes/:index',(req, res)=>{
//     notes[req.params.index] = req.body;
//     res.send('data updated complete !');
// })

module.exports = app; //server ko export krdia taki server.js file m use kr ske
