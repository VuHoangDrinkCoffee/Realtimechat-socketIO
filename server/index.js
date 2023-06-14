var express = require('express')
var app = express();
var server = require('http').Server(app);
const io = require('socket.io')(server)

app.use(express.static("/public"));
app.set('view engine', 'ejs')
app.set('views', './views')

server.listen(3000);

io.on('connection', function(socket){
    console.log('new user connected: '+ socket.id)
    socket.on('disconnect', function(){
        console.log(socket.id+ " disconected")
    })
});

app.get("/", function(req, res){
    res.render('trangchu');
})