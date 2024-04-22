const { catchAsyncHandler } = require("../middlewares/catchAsyncHandler");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.homepage = catchAsyncHandler((req, res, next) => {
    res.status(200).json({message: "homepage"})
})

exports.studentsignup = catchAsyncHandler(async (req, res, next) => {
    const student = await new Student(req.body).save();
    res.status(201).json(student);
})

exports.studentsignin = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findOne({email: req.body.email}).select("+password").exec();
    
    if(!student){
        return next(new ErrorHandler("Student with this email not found", 500));
    }

    const isMatch = student.correctpassword(req.body.password);

    if(!isMatch){
        return next(new ErrorHandler("Wrong Credientials", 500));
    }

    res.status(200).json(student);
})

exports.studentsignout = catchAsyncHandler(async (req, res, next) => {
})