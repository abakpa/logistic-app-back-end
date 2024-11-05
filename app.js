const express = require('express');
const mongoose = require('mongoose')
const http = require('http')
const routes = require('./routes')
require('dotenv').config()
const {Server} = require('socket.io')
const cors = require('cors');


const app = express();
const port = process.env.PORT || 4000;

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/logistic-business-app'

mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log('MongoDb connected')).catch(err=>console.log(err))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const server = http.createServer(app)

app.get('/', (req, res) => {
    res.send('Hello World.......!');
});

app.use('/', routes);

const io = new Server(server,{
    cors:{
        origin: ['http://localhost:https://logistic-app-backoffice-es2p.vercel.app/','http://localhost:https://logistic-app-front-end-hxqg.vercel.app/'],
        methods:['GET','POST','PUT']
    }
})
io.on('connection',(socket)=>{

    socket.on('send_message',(data)=>{
        socket.broadcast.emit('recieve_message',data)
    })
    socket.on('send_user_message',(data)=>{
        socket.broadcast.emit('recieve_user_message',data)
    })
})

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
