const express = require('express')
const morgan = require('morgan')
const http = require('http')
const socketIo = require('socket.io')
const cors= require('cors')

const route= require('./routes')
const db = require('./config/db')

const app = express()
const port = 3001
const httpServer = http.createServer(app)
const io = new socketIo.Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    }
})

app.use(morgan('combined'))
app.use(express.json())
app.use(cors())
db.connect()
route(app)

global.onlineUsers = new Map()
io.on('connection', (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });

    console.log('User connected',socket.id)
    // // socket.on('sendDataClient', (data) => {
    // //     io.emit('sendDataServer', { data })
    // // })
    // socket.on('send_message', (msg) => {
    //     const message = new Message({ msg })
    //     message.save().then(() => {
    //         io.emit('message', msg)
    //     }).catch(err => {console.log(err)})
    // })

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
    })
})



// app.get('/', (req, res) => {
//     res.send('Hello Wodsfasrld! nguyen duc quoc')
// })

httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})