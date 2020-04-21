const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const userRouter = require("../users/user-router");
const authRouter = require("../auth/auth-router");
const authenticator = require("../auth/authenticator");

const server = express();

const sessionConfig = {
    name: "bobloblaw",
    secret: process.env.SESSION_SECRET || "classified",
    resave: false,
    saveUninitialized: process.env.SEND_COOKIES || true,
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: process.env.USE_SECURE_COOKIES || false,
        httpOnly: true, 
    },
};

server.use (helmet());
server.use(cors());
server.use (express.json());
server.use (session(sessionConfig));

server.use("/api/users", authenticator, userRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.json({api: "Up and Running!"});
});

module.exports = server;