import { Server } from "socket.io";
import { server } from "./server.js";

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

export { io };
