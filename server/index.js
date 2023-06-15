var express = require('express')
var app = express();
var server = require('http').Server(app);

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use('/app', express.static('app'));
server.listen(3000);

app.get("/", function(req, res){
    res.render('trangchu');
})