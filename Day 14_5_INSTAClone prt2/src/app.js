const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//require routes
const authRouter = require("../routes/auth.routes");
const postRouter = require("../routes/post.routes");
const userRouter = require("../routes/user.routes");

app.use(express.json());
app.use(cookieParser());

//using routes
app.use("/api/auth", authRouter); //? hamare sabhi authRoutes ke aange yeh prefix lgega
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter)

module.exports = app;
