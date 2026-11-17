import app from "./src/app.js";
import {createServer} from "http";
import {Server} from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, {/* options */});

io.on("connection", (socket) => {
  console.log("new user connected");  

  socket.on('message',(msg)=>{
    console.log("user fired message event");
    console.log(msg);

    io.emit('abc',msg) //server will send the message to all the users connected to the server
  })
})

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
  //it intializes our server means our http server 
})