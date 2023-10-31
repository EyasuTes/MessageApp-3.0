const express = require("express");
const app = express();
const cors = require("cors");
const chats = require("./data/data.js");
const dotenv = require("dotenv");
const mongodbConnect = require("./config/db.js");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler.js");

dotenv.config();

app.use(cors());
app.use(express.json());
mongodbConnect();

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(3001);
