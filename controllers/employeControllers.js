const { catchAsyncHandler } = require("../middlewares/catchAsyncHandler");
const Employe = require("../models/employeModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const imagekit = require("../utils/imagekit").initImageKit();

exports.homepage = catchAsyncHandler(async (req, res, next) => {
    res.status(200).json({message: "Secure Employe homepage"})
})

exports.currentemploye = catchAsyncHandler(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    res.status(200).json({employe});
})

exports.employesignup = catchAsyncHandler(async (req, res, next) => {
    const employe = await new Employe(req.body).save();
    sendtoken(employe, 201, res);
})

exports.employesignin = catchAsyncHandler(async (req, res, next) => {
    const employe = await Employe.findOne({email: req.body.email}).select("+password").exec();
    
    if(!employe){
        return next(new ErrorHandler("Employe not found with this email address", 404));
    }

    const isMatch = employe.correctpassword(req.body.password);

    if(!isMatch){
        return next(new ErrorHandler("Wrong Credientials", 500));
    }

    sendtoken(employe, 200, res);
})

exports.employesignout = catchAsyncHandler(async (req, res, next) => {
    res.clearCookie("token");
    res.json({message: "Successfullu signout"});
})

exports.employesendmail =catchAsyncHandler (async (req, res, next) => {
    const employe = await Employe.findOne({email: req.body.email}).exec();

    if(!employe){
        return next(new ErrorHandler("Employe not found with this email address", 404));
    }

    const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`;

    sendmail(req, res, next, url);
    employe.resetPasswordToken = "1";
    // console.log(employe);
    await employe.save();

    res.json({employe, url});
})

exports.employeforgetlink = catchAsyncHandler(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();

    if(!employe){
        return next(new ErrorHandler("Employe not found with this email address", 404));
    }

    if(employe.resetPasswordToken == "1"){
        employe.resetPasswordToken = "0";
        employe.password = req.body.password;
        await employe.save();
    }
    else{
        return next(new ErrorHandler("Invalid Reset Password Link! please try again", 500));
    }

    res.status(200).json({
        message: "Password has been successfully changed"
    })
})

exports.employeresetpassword = catchAsyncHandler(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();

    employe.password = req.body.password;
    await employe.save();
    sendtoken(employe, 200, res);
})

exports.employeupdate = catchAsyncHandler(async (req, res, next) => {
    const employe = await Employe.findByIdAndUpdate(req.id, req.body, {new: true}).exec();
    res.status(200).json({
        success: true,
        message: "Employe Updated Successfully",
        employe
    })
})

exports.employeavatar = catchAsyncHandler(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();
    const file = req.files.organizationlogo;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

    // delete file on imagekit
    if(employe.organizationlogo.fileId !== ""){
        await imagekit.deleteFile(employe.organizationlogo.fileId);
    }

    // upload file on imagekit
    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName
    })

    employe.organizationlogo = { fileId, url };
    await employe.save();

    res.status(200).json({
        success: true,
        message: "organizationlogo upload successfully"
    })
})