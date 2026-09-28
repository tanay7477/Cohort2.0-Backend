const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors')
const morgan = require("morgan")

const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");

const multer = require("multer");
// multer do use hai
//* - server ko form-data format samj aae
//* - file ko cloud pe store kroge but temporarily store krne ke liye ram or memorystorage (dono ek hi hai) pe rkhoge
const upload = multer({ storage: multer.memoryStorage() });

//* how to use multer
// route main middle main route main controller ke beech main you can check routes file

app.use(morgan('dev'))
app.use(express.json()); //for raw json data
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173" //origin bhi btana pdega kiss origin se req aarhi jisse backend ka server cookies set krt paae
}))

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

module.exports = app;
