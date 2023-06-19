const { Socket } = require('dgram');
var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use('/public', express.static('public'));
server.listen(3000);

io.on("connection", (socket)=>{
    console.log(socket.id + " connected");
})
app.get("/", function(req, res){
    res.render('trangchu');
})