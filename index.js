var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");
var port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, "public")));

app.get("*", function(req,res,next) {
	res.redirect("/");
})

app.userCount = 0;

io.on('connection', function(socket){
	const user = socket.handshake.query.name;
	const from = socket.id;
	
	socket.on('chat_message_sent', function(msg){
		io.emit('chat_message_received', { ...msg, user, from});
	});

	socket.on('disconnect', function(msg){
		io.emit('member_exit', { from, user, counter: --app.userCount });
	});

	socket.on('confetti_thrown', function(msg){
		io.emit('confetti_received', { from, user });
	});

	io.emit('new_member', { from, user, counter: ++app.userCount });
});

http.listen(port, function(){
  console.log('Open your browser on http://localhost:' + port);
});



