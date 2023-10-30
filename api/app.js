const express = require("express");
const app = express();
const cors = require("cors");
const chats = require("./data/data.js");
const dotenv = require("dotenv");
const mongodbConnect = require("./config/db.js");
const userRoutes = require("./routes/userRoutes");
dotenv.config();

app.use(express.json());
mongodbConnect();

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/user", userRoutes);

app.listen(3001);
