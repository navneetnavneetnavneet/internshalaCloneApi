const { catchAsyncHandler } = require("../middlewares/catchAsyncHandler");

exports.homepage = catchAsyncHandler((req, res, next) => {
    res.status(200).json({message: "homepage"})
})