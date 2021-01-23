import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import routePost from "./routes/post.router.js";
import routeUser from "./routes/user.router.js";
import connection from "./database/connection.js";
import socketIo from "./routes/socket.js";

dotenv.config();

import * as socket from "socket.io";
import http from "http";
const app = express();
const server = http.createServer(app);
const io = new socket.Server();
io.attach(server);
socketIo(io);

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/", routePost);
app.use("/", routeUser);

app.get("/", (req, res) => {
  res.send("API memories!");
});

connection
  .then(() => server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch((err) => console.error(err));
