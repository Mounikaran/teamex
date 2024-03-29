import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import eventRoutes from './routes/events.js';
import userRoutes from './routes/user.js';
import usersRoutes from './routes/users.js';
import conversationRoutes from './routes/conversations.js';
import projectRoutes from './routes/projects.js';
import taskRoutes from './routes/tasks.js';
import Server from 'socket.io';

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/events', eventRoutes);
app.use('/user', userRoutes);
app.use('/users', usersRoutes);
app.use('/conversations', conversationRoutes);
app.use('/projects', projectRoutes);
app.use("/tasks", taskRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to TeamEx');
});

// const CONNECTION_URL = process.env.CONNECTION_URL;
// const CONNECTION_URL = 'mongodb+srv://mounikaran:SURlmhjHvXfAlZjl@cluster0.h3rtf.mongodb.net/Teamex';
const CONNECTION_URL = 'mongodb+srv://mounikaran:SURlmhjHvXfAlZjl@cluster0.h3rtf.mongodb.net/Teamex?authSource=admin&replicaSet=atlas-f5l2vu-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const server = app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
        const io = new Server(server, { cookie: false });
        const users = {};

        const socketToRoom = {};

        io.on('connection', socket => {
            socket.on("join room", (roomID) => {
                if (users[roomID]) {
                    users[roomID].push(socket.id);
                } else {
                    users[roomID] = [socket.id];
                }
                socketToRoom[socket.id] = roomID;
                socket.join(roomID);
                const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

                socket.emit("all users", usersInThisRoom);
            });

            socket.on('playVideo', () => {
                socket.broadcast.to(socketToRoom[socket.id]).emit('playVideo');
            });

            socket.on('pauseVideo', () => {
                socket.broadcast.to(socketToRoom[socket.id]).emit('pauseVideo');
            });

            socket.on('stopVideo', () => {
                socket.broadcast.to(socketToRoom[socket.id]).emit('stopVideo');
            });

            socket.on('chat message', (finalMessage) => {
                socket.broadcast.to(socketToRoom[socket.id]).emit('chat message', finalMessage);
            });

            socket.on('mouse', (data) => {
                socket.broadcast.to(socketToRoom[socket.id]).emit('mouse', data);
            });

            socket.on('erase', () => {
                socket.broadcast.to(socketToRoom[socket.id]).emit('erase');
            });

            socket.on('disconnect', () => {
                const roomID = socketToRoom[socket.id];
                let room = users[roomID];
                if (room) {
                    room = room.filter(user => user.id !== socket.id);
                    users[roomID] = room;
                }
                socket.broadcast.emit('user left', socket.id);
            });

        });
    })
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
