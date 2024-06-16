
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

io.on("connection" , function(socket){
    // bien socket la dai dien cho client dang ket noi toi 
    console.log("Co nguoi ket noi toi " , socket.id)

    socket.on("disconnect" , function(){
        console.log(socket.id + " >> ngat ket noi tu client ");
    });

    socket.on("Client-send-pdf", function(data){
        console.log("Received PDF data from: " + socket.id);
        
        // Lưu trữ tệp PDF
        var buffer = Buffer.from(new Uint8Array(data));
        fs.writeFile("uploaded_file.pdf", buffer, function(err){
            if(err){
                console.log("Error saving PDF: ", err);
            } else {
                console.log("PDF saved successfully.");
            }
        });
    });

    socket.on("Client-send-data" , function(data){
        console.log("received data from >> " + socket.id + " >> " + data);

        // // P1 :: server tra ve data co toan bo cac client
        // io.sockets.emit("Server-send-data" , data + " P1");

        // // P2 :: server tra ve cho CHINH NO 
        // socket.emit("Server-send-data" , data + " P2");

        // P3 :: server tra ve data co toan bo cac client NGOAI TRU CHINH NO LA KHONG NHAN DUOC
        socket.broadcast.emit("Server-send-data" , data + " P3");

    });
    
    


});



// create route
app.get("/" , function(req,res){
    // tra ve view trong folder views
    res.render("trangchu");
});

