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
        socket.emit('user-send-succes', data)
        console.log(userOnline);
        io.sockets.emit('sever-send-onlineUser', userOnline)
    }

  });
});
app.get("/", function (req, res) {
  res.render("trangchu");
});
