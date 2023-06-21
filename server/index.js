const { Socket } = require("dgram");
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/public", express.static("public"));
server.listen(3000);

var userOnline = [];

io.on("connection", (socket) => {
  console.log(socket.id + " connected");
  socket.on("client-send-userName", (data) => {
    if (userOnline.includes(data) >= 1) {
      socket.emit("user-send-failed");
    } else {
      userOnline.push(data);
      socket.Username = data;
      socket.emit("user-send-succes", data);
      io.sockets.emit("sever-send-onlineUser", userOnline);
    }
    socket.on("logout", () => {
      userOnline.splice(userOnline.indexOf(socket.Username), 1);
      socket.broadcast.emit("sever-send-onlineUser", userOnline);
    });
  });
  socket.on("user-send-messages", (data) => {
    io.sockets.emit("server-send-messages", { un: socket.Username, nd: data });
  });
  socket.on('typing-by-user', () =>{
    var s = 'Typing by ' + socket.Username;
    socket.broadcast.emit('typing-by-someones', s)
  })
  socket.on('stop-typing-by-user', () =>{
    socket.broadcast.emit('stop-typing-by-someones')
  })
});
app.get("/", function (req, res) {
  res.render("trangchu");
});
