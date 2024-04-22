require("dotenv").config({
    path: "./.env"
})
const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouters");
const logger = require("morgan");

// logger
app.use(logger("tiny"));

// routes
app.use("/", indexRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})