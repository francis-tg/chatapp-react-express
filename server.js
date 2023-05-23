const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const session = require("express-session");
const {Server} = require("socket.io");
const cors = require("cors");
const {jwtAuth} = require("./config/passport");
const passport = require("passport");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
require("dotenv").config();

app.use(
  session({
    saveUninitialized: false,
    resave: true,
    secret: "12345"
  })
);

app.use(passport.initialize());
app.use(passport.session());

jwtAuth(passport);
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("database connect");
});

app.use("/api/user", require("./routes/api/user"));
app.use("/api/message", require("./routes/api/message"));

const server = http.createServer(app);
const io = new Server(server);
io.on("connection", socket => {
  console.log("user connect");
});
app.get("/", (req, res) => {
  res.send("i am ok");
});
app.io = io;
const PORT =
  process.env.NODE_ENV === "production" ? 80 : process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log("run on port " + PORT);
});
