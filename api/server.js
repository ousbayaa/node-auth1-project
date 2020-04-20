const express = require("express");
const helmet = require("helmet");
const session = require("express-session");

const userRouter = require("../users/user-router");
const authRouther = require("../auth/auth-router");
const authenticator = require("../auth/authenticator");

const server = express();
