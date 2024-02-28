require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const cookiesParser = require("cookie-parser")
// const ErrorMiddleware = require("./middleware/error")
const userRouter = require("./routes/user.route")
// const courseRouter=require("./routes/course.route")
// const orderRouter=require("./routes/order.route")
// const notificationRoute=require("./routes/notification.route")
app.use(express.json({ limit: "50mb" }));
app.use(cookiesParser());
app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN
}))
// const cloudinary=require("cloudinary")
const connectDb = require("./utils/db");
// const multer = require("multer");
// const path=require("path")

app.get("/test", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "API WORKING"
    })
})
app.use(express.urlencoded({extended:true}))
app.use("/api/v1", userRouter);
// app.use("/api/v1", courseRouter);
// app.use("/api/v1", orderRouter);
// app.use("/api/v1", notificationRoute);


app.all("*", (req, res, next) => {
    const err = new Error("Route not found");
    err.status = 404;
    next(err)

})
// app.use(ErrorMiddleware)


// cloudinary.config({
//     cloud_name:process.env.CLOUD_NAME,
//     api_key:process.env.CLOUD_API_KEY,
//     api_secret:process.env.CLOUD_SECRET_KEY
// })
app.listen(process.env.PORT, function () {
    console.log(`server is running:${process.env.PORT}`);
    connectDb();
});