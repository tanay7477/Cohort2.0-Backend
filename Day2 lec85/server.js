const express = require("express");//import baad m pdenge abhi require krte hai
const app = express();

//Server is programmed in such a way if user gives any request 
//than server will response "heelo World";

app.get("/" , (req , res)=>{
    res.send("hello")
})

app.get("/about" , (req , res)=>{
    res.send("hello ritik")
})


app.listen(3000);
