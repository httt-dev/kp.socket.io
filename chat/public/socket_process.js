// ket noi toi websocket server
var socket = io("localhost:3000");

socket.on("server-send-register-failure" , function(){
    alert("Sai username, hay chon ten khac");
});

socket.on("server-send-register-success" , function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});

socket.on("server-send-list-users" , function(data){
    // data is array
    $("#boxContent").html("");

    data.forEach(user => {
        $("#boxContent").append("<div class='user'>" + user + "</div>");
    });
    // boxContent
});



$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();
    
    $("#btnRegister").click(function(){
        socket.emit("client-send-Username" , $("#txtUsername").val());
    });

    // logout
    $("#btnLogout").click(function(){
        socket.emit("client-send-logout");
        $("#loginForm").show(2000);
        $("#chatForm").hide(1000);
        
    });
});
