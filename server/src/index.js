var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html')
    console.log('server running')
});

io.on("connection", function(socket) {
    console.log("a user connected");

    socket.on("chat message", function(msg) {
        io.emit("chat message", msg);
        console.log(msg);
    });

    socket.on("disconnect", function() {
        console.log("user disconnected");
    });
});

http.listen(8383, function() {
    console.log("listening on *:8383");
});
