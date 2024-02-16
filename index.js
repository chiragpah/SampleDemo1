const mongoose = require("mongoose");
const express = require("express");
const userRouter = require("./router/user.router");
const cors = require("cors");
mongoose.connect("mongodb://127.0.0.1:27017/Project");

const app = express();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/", userRouter);

app.listen(3000, function () {
    console.log("server is running");
});

