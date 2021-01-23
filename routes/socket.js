import {
  addRoom,
  getRoom,
  addUser,
  getUser,
  addMessage,
  getMessage,
  removeUser,
} from "../controllers/room.controller.js";

export default (io) => {
  io.on("connection", (socket) => {
    socket.on("init", (callback) => {
      const rooms = getRoom("");
      rooms.then((data) => callback(data));
    });
    socket.on("join", async ({ _user, room }, callback) => {
      if (socket.info && room === socket.info.room) return callback({ error: "room has already been joined" });
      const res = await addUser(room, _user);
      if (socket.info) {
        const { room, id } = socket.info;
        removeUser(room, id);
        socket.leave(room);
        socket.broadcast.to(room).emit("message", {
          uid: "admin",
          displayName: "admin",
          message: `${_user.displayName} has left`,
          _id: new Date().getTime().toString(),
        });
      }
      socket.info = { id: _user._id, room: room, displayName: _user.displayName };
      if (res.error) return callback(res);
      if (res._id) return callback(res);
      socket.join(room);
      socket.broadcast.to(room).emit("message", {
        uid: "admin",
        displayName: "admin",
        message: `${_user.displayName} has join`,
        _id: new Date().getTime().toString(),
      });
    });
    socket.on("create-room", (args) => {
      addRoom(args).then((data) => {
        socket.emit("room", data);
      });
    });
    socket.on("sendMessage", (message) => {
      addMessage(message.room, message.message);
      io.to(message.room).emit("message", message.message);
    });
    socket.on("getMessage", async (room, callback) => {
      const messages = await getMessage(room);
      callback(messages);
    });
    socket.on("disconnect", () => {
      if (socket.info) {
        const { room, id, displayName } = socket.info;
        removeUser(room, id);
        socket.leave(room);
        socket.broadcast.to(room).emit("message", {
          uid: "admin",
          displayName: "admin",
          message: `${displayName} has left`,
          _id: new Date().getTime().toString(),
        });
      }
    });
  });
};
