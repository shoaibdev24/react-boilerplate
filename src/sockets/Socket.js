import { io } from "socket.io-client";

class SocketSingleton {
    constructor() {
        if (!SocketSingleton.instance) {
            this.socket = null;
            SocketSingleton.instance = this;
        }
        return SocketSingleton.instance;
    }

    connect(url, options) {
        if (!this.socket) {
            this.socket = io(url, options);
            console.log("Connected to Socket.IO!");

        }
        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            console.log("Disconnected from Socket.IO!");
            this.socket = null;
        }
    }

    emit(event, data) {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }

    on(event, callback) {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }
}

const socketInstance = new SocketSingleton();
export default socketInstance;