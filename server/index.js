const { Socket } = require("dgram");
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/public", express.static("public"));
server.listen(3000);

io.on("connection", (socket) => {
  socket.on("room-created", (data) =>{
    socket.join(data);
    socket.phong = data;

    var roomList = [];
    for(r in socket.adapter.rooms){
      roomList.push(r);
    }
    io.sockets.emit("server-send-room-list", roomList)

    socket.on("user-send-message", (data) =>{
      io.sockets.in(socket.phong).emit("server-send-message", data)
    })
  })
});
app.get("/", function (req, res) {
  res.render("trangchu");
});
