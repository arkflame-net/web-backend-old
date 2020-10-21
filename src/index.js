const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const Socket = require("./networking/socket");

const app = express();
const socket = new Socket();

// Settings
app.set("socket", socket);

require("dotenv").config();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}));

// Routes
app.use(require("./routes/default.routes"));

// Express Listener
app.listen(6546, () => {
    console.log("[Express] Server listening on port 6546");
});

// TCP Listener
socket.listen((port, host) => {
    console.log(`[TCP] Server listening on ${host}:${port}`);
}, 8132, "127.0.0.1");

socket.on("connect", (connection) => {
    console.log("[TCP] " + connection.remoteAddress + ":" + connection.remotePort + " had connected to the server");
});

socket.on("packet", (connection, packet) => {
    console.log("[TCP] " + connection.remoteAddress + ":" + connection.remotePort + " sent the following packet: " + packet);
});