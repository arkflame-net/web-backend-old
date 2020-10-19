const net = require("net");

class Socket {
    constructor() {
        this.server = net.createServer();
        this.connections = new Set();
        this.events = new Map();
        this.port = 6000;
        this.address = "127.0.0.1";

        this.setup();
    }

    emit(eventName, ...args) {
        let callbacks = this.events.get(eventName) || [];

        for (let callback of callbacks) {
            callback(...args);
        }
    }

    on(eventName, callback) {
        let callbacks = this.events.get(eventName) || [];

        callbacks.push(callback);

        this.events.set(eventName, callbacks);
    }

    setup() {
        this.server.on("connection", (connection) => {
            this.connections.add(connection);

            this.emit("connect", connection);

            connection.on("data", (packet) => {
                this.emit("packet", connection, packet);
            })

            connection.on("close", () => {
                this.connections.delete(connection);
            });

            connection.on("error", () => {
                this.connections.delete(connection);
            });
        });
    }

    listen(callback) {
        this.server.listen(this.port, this.address);

        if (callback != null) {
            callback(this.port, this.address);
        }
    }

    flush() {
        console.log("[TCP] Flushed written data.");

        for (let connection of this.connections) {
            connection.write("\n");
        }
    }

    write(string) {
        console.log("[TCP] Written: " + string);

        for (let connection of this.connections) {
            connection.write(string);
        }
    }
}

module.exports = Socket;