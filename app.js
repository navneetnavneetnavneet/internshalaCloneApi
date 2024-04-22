require("dotenv").config({
    path: "./.env"
})
const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouters");
const logger = require("morgan");
const ErrorHandler = require("./utils/ErrorHandler");
const { generateErrors } = require("./middlewares/errors");

// logger
app.use(logger("tiny"));

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