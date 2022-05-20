const {Server} = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.set('view engine', 'hbs');

app.use('/node', express.static('node_modules'));
app.use('/public', express.static('public'));


app.get('/', (req, res)=>{
    res.render('index');
});

io.on('connection', (socket) =>{
    // check user connected
    console.log(`a user with id (${socket.id}) connected `);
    socket.on('disconnect', ()=>{
        console.log(`a user with id (${socket.id}) disconnected`);
    });
    socket.on('chat message', (msg)=>{
        // CLIENT TO CLIENT
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('server chat message', (msg)=>{
        // SERVER TO ALL CLIENTS
        socket.broadcast.emit('server chat message', msg);
    });
});


const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});