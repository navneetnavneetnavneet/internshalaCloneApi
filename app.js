require("dotenv").config({
    path: "./.env"
})
const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouters");
const logger = require("morgan");
const ErrorHandler = require("./utils/ErrorHandler");
const { generateErrors } = require("./middlewares/errors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");

// db connction
require("./models/db").connectDatabase();

// logger
app.use(logger("tiny"));

// body parser
app.use(express.json());
app.use(express.urlencoded());

// express file-upload
app.use(fileupload());

//session and cookie
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(cookieParser());

// routes
app.use("/", indexRouter);

// error handling
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404));
})
app.use(generateErrors);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})