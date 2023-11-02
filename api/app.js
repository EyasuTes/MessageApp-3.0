const express = require("express");
const app = express();
const cors = require("cors");
const chats = require("./data/data.js");
const dotenv = require("dotenv");
const mongodbConnect = require("./config/db.js");
const userRoutes = require("./routes/userRoutes");
const chatsRoutes = require("./routes/chatsRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler.js");

dotenv.config();

app.use(cors());
app.use(express.json());
mongodbConnect();

app.use("/api/user", userRoutes);
app.use("/api/chats", chatsRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(3001);
