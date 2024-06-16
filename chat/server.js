
var express = require("express");

var app = express();
app.use(express.static("./public"));
// thiet lap view engine la ejs
app.set("view engine", "ejs");
// thiet lap thu muc views la thu muc views di tu root 
app.set("views", "./views") ; 

var server = require("http").Server(app);

// lang nghe cac ket noi tu client
// Khởi tạo Socket.IO với một máy chủ HTTP 
// sử dụng cùng một cổng cho cả giao tiếp HTTP thông thường (các yêu cầu HTTP) và giao tiếp WebSocket (Socket.IO)
var io = require("socket.io")(server);

server.listen(3000);

// mang users
var users = [];

io.on("connection" , function(socket){
    console.log("Co nguoi vua ket noi " + socket.id);

    //client-send-Username
    socket.on("client-send-Username" , function(data){
        console.log(data);
        if(users.indexOf(data) >=0){
            // da ton tai username
            socket.emit("server-send-register-failure");
        }
        else{
            // dang ky thanh cong
            users.push(data);
            socket.Username = data;
            socket.emit("server-send-register-success" , data);

            io.sockets.emit("server-send-list-users",users );

        }
    });

    // logout
    socket.on("client-send-logout", function(){
        // delete user 
        users.splice(
            users.indexOf(socket.Username), 1
        );
        socket.broadcast.emit("server-send-list-users" , users);

    });
})

// create route
app.get("/" , function(req,res){
    // tra ve view trong folder views
    res.render("trangchu");
});

