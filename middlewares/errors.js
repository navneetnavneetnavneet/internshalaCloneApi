exports.generateErrors = (err, req, res, next) => {
    statusCode = err.statusCode;

    res.status(statusCode).json({
        message: err.message,
        errName: err.name,
        // stack: err.stack
    })
}