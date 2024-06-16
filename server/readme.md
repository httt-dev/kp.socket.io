### https://www.youtube.com/watch?v=ofptoO93IFI
### npm init
### npm install express ejs socket.io

### run sever : 
```bat
node index.js

```

### emit : send data ( client)
### on : received (server)

### client (emit >> event name)-----> server (on)

### Cac dang gui tin hieu tu server 
### 1. Client A gui len server >> serverse gui lai cho toan bo cac client trong do co A ( io.sockets.emit)
### 2. Client A gui len server >> serverse gui lai cho toan bo cac client trong do KHONG co A ( socket.broadcast.emit)
### 3. Client A gui len server >> serverse gui lai chi cho client A ( socket.emit)

### 4. Client A gui len server >> serverse gui lai cho toan bo cac client trong group nao do

### 5. Client A gui len server >> chi muon gửi cho client B thi su dung : io.to("socketid").emit()
