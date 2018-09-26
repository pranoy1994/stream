var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
 
var path = require('path');
var port = process.env.port || 3000;
 
app.use(express.static(__dirname + "/public" ));
 
app.get('/send',function(req,res){
res.sendFile(path.join(__dirname, 'test.html'));
});
app.get('/view',function(req,res){
    res.sendFile(path.join(__dirname, 'view.html'));
    });
 
io.on('connection',function(socket){
 
    socket.on('stream',function(image){
        console.log(image);
        socket.broadcast.emit('stream',image);  
    });
 
});
 
http.listen(port,function(){
console.log("Server running at port "+ port);
});