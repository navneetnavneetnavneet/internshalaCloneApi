const { catchAsyncHandler } = require("../middlewares/catchAsyncHandler");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const imagekit = require("../utils/imagekit").initImageKit();

exports.homepage = catchAsyncHandler(async (req, res, next) => {
    res.status(200).json({message: "Secure homepage"})
})

exports.currentstudent = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    res.status(200).json({student})
})

exports.studentsignup = catchAsyncHandler(async (req, res, next) => {
    const student = await new Student(req.body).save();
    sendtoken(student, 201, res);
})

exports.studentsignin = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findOne({email: req.body.email}).select("+password").exec();
    
    if(!student){
        return next(new ErrorHandler("Student not found with this email address", 404));
    }

    const isMatch = student.correctpassword(req.body.password);

    if(!isMatch){
        return next(new ErrorHandler("Wrong Credientials", 500));
    }

    sendtoken(student, 200, res);
})

exports.studentsignout = catchAsyncHandler(async (req, res, next) => {
    res.clearCookie("token");
    res.json({message: "Successfullu signout"});
})

exports.studentsendmail =catchAsyncHandler (async (req, res, next) => {
    const student = await Student.findOne({email: req.body.email}).exec();

    if(!student){
        return next(new ErrorHandler("Student not found with this email address", 404));
    }

    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`;

    sendmail(req, res, next, url);
    student.resetPasswordToken = "1";
    console.log(student);
    await student.save();

    res.json({student, url});
})

exports.studentforgetlink = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();

    if(!student){
        return next(new ErrorHandler("Student not found with this email address", 404));
    }

    if(student.resetPasswordToken == "1"){
        student.resetPasswordToken = "0";
        student.password = req.body.password;
        await student.save();
    }
    else{
        return next(new ErrorHandler("Invalid Reset Password Link! please try again", 500));
    }

    res.status(200).json({
        message: "Password has been successfully changed"
    })
})

exports.studentresetpassword = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();

    student.password = req.body.password;
    await student.save();
    sendtoken(student, 200, res);
})

exports.studentupdate = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findByIdAndUpdate(req.id, req.body, {new: true}).exec();
    res.status(200).json({
        success: true,
        message: "Student Updated Successfully",
        student
    })
})

exports.studentavatar = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();
    const file = req.files.avatar;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

    // delete file on imagekit
    if(student.avatar.fileId !== ""){
        await imagekit.deleteFile(student.avatar.fileId);
    }

    // upload file on imagekit
    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName
    })

    student.avatar = { fileId, url };
    await student.save();

    res.status(200).json({
        success: true,
        message: "avatar upload successfully"
    })
})