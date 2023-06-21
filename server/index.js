import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import "./database/db.js";
import bodyParser from 'body-parser';
import router from './routes/ChatRoutes.js';
import cors from 'cors';
import { addUserSocket, getUserSocket, usersSocket } from './Socket/SocketControllers.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

const PORT = 8000;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.get('/', (req, res) => {
  res.send("HELLO");
});





io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  //when frontend hit equals add users
  socket.on("addUsers",(userData)=>{
    addUserSocket(userData,socket.id);
    //using emit in people.js

    //now using emit to share data to frontend about active users
    io.emit("getUsers",usersSocket)
  })


  //to send message 
  //we need socket id of other user also
  socket.on("sendMessage",(userData)=>{
    //message = sender id , reciever id , message 
    const otherUserData=getUserSocket(userData.recieverId);
    //to = kya message 
    //getMessage = kiske through
    //data = value of data 
    // console.log("other user data");
    // console.log(otherUserData)
    io.to(otherUserData?.socketId).emit('getMessage',userData);
    console.log(otherUserData?.socketId);
  })
});

server.listen(PORT, () => {
  console.log(`Server running successfully on PORT ${PORT}`);
});
