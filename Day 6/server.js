//  iss file ka do kaam hai-
//   --> Server create krna 
//   --> Database se connect krna

const app = require('./src/app');
const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect('mongodb+srv://tanay:TanayVyasDB123@cluster0.ow0aggh.mongodb.net/day-6')
    .then(() => {
        console.log('Connected to MongoDB!');
    })
}//yeh uri mongodb server ko cluster se connect kr hi 
 //but hamara database to cluster ke andr hai hume usse connect krna so we write day-6


 connectToDB();


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 