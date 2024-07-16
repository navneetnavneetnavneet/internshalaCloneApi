const { catchAsyncHandler } = require("../middlewares/catchAsyncHandler");
const Student = require("../models/studentModel");
const { v4: uuidv4 } = require("uuid");
const ErrorHandler = require("../utils/ErrorHandler");

exports.resume = catchAsyncHandler(async (req, res, next) => {
    const { resume } = await Student.findById(req.id).exec();
    res.status(200).json({message: "Secure resume route", resume});
})

// ---------------------education---------------------

exports.addeducation = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({...req.body, id: uuidv4()});
    await student.save();

    res.status(200).json({
        message: "Education Added",
    })
})

exports.editeducation = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const educationIndex = student.resume.education.findIndex(i => i.id == req.params.eduid);
    student.resume.education[educationIndex] = {...student.resume.education[educationIndex], ...req.body};
    await student.save();

    res.status(200).json({
        message: "Education Updated",
    })
})

exports.deleteeducation = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredEducation = student.resume.education.filter(i => i.id !== req.params.eduid);
    student.resume.education = filteredEducation;
    await student.save();

    res.status(200).json({
        message: "Education Deleted",
    })
})

// ---------------------job---------------------

exports.addjob = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({...req.body, id: uuidv4()});
    await student.save();

    res.status(200).json({
        message: "Job Added",
    })
})

exports.editjob = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const jobIndex = student.resume.jobs.findIndex(i => i.id == req.params.jobid);
    student.resume.jobs[jobIndex] = {...student.resume.jobs[jobIndex], ...req.body};
    await student.save();

    res.status(200).json({
        message: "Job Updated",
    })
})

exports.deletejob = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredJob = student.resume.jobs.filter(i => i.id !== req.params.jobid);
    student.resume.jobs = filteredJob;
    await student.save();

    res.status(200).json({
        message: "Job Deleted",
    })
})

// ---------------------internship---------------------

exports.addinternship = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({...req.body, id: uuidv4()});
    await student.save();

    res.status(200).json({
        message: "Internship Added",
    })
})

exports.editinternship = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const internshipIndex = student.resume.internships.findIndex(i => i.id == req.params.internshipid);
    student.resume.internships[internshipIndex] = {...student.resume.internships[internshipIndex], ...req.body};
    await student.save();

    res.status(200).json({
        message: "internship Updated",
    })
})

exports.deleteinternship = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredinternship = student.resume.internships.filter(i => i.id !== req.params.internshipid);
    student.resume.internships = filteredinternship;
    await student.save();

    res.status(200).json({
        message: "internship Deleted",
    })
})

// ---------------------responsibilitie---------------------

exports.addresponsibilitie = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({...req.body, id: uuidv4()});
    await student.save();

    res.status(200).json({
        message: "Responsibilitie Added",
    })
})

exports.editresponsibilitie = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const responsibilitieIndex = student.resume.responsibilities.findIndex(i => i.id == req.params.responsibilitieid);
    student.resume.responsibilities[responsibilitieIndex] = {...student.resume.responsibilities[responsibilitieIndex], ...req.body};
    await student.save();

    res.status(200).json({
        message: "Responsibilitie Updated",
    })
})

exports.deleteresponsibilitie = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredresponsibilitie = student.resume.responsibilities.filter(i => i.id !== req.params.responsibilitieid);
    student.resume.responsibilities = filteredresponsibilitie;
    await student.save();

    res.status(200).json({
        message: "Responsibilitie Deleted",
    })
})

// ---------------------course---------------------

exports.addcourse = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({...req.body, id: uuidv4()});
    await student.save();

    res.status(200).json({
        message: "Course Added",
    })
})

exports.editcourse = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const courseIndex = student.resume.courses.findIndex(i => i.id == req.params.courseid);
    student.resume.courses[courseIndex] = {...student.resume.courses[courseIndex], ...req.body};
    await student.save();

    res.status(200).json({
        message: "Course Updated",
    })
})

exports.deletecourse = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredcourse = student.resume.courses.filter(i => i.id !== req.params.courseid);
    student.resume.courses = filteredcourse;
    await student.save();

    res.status(200).json({
        message: "Course Deleted",
    })
})

// ---------------------project---------------------

exports.addproject = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({...req.body, id: uuidv4()});
    await student.save();

    res.status(200).json({
        message: "Project Added",
    })
})

exports.editproject = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const projectIndex = student.resume.projects.findIndex(i => i.id == req.params.projectid);
    student.resume.projects[projectIndex] = {...student.resume.projects[projectIndex], ...req.body};
    await student.save();

    res.status(200).json({
        message: "Project Updated",
    })
})

exports.deleteproject = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredproject = student.resume.projects.filter(i => i.id !== req.params.projectid);
    student.resume.projects = filteredproject;
    await student.save();

    res.status(200).json({
        message: "Project Deleted",
    })
})

// ---------------------skill---------------------

exports.addskill = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({...req.body, id: uuidv4()});
    await student.save();

    res.status(200).json({
        message: "Skill Added",
    })
})

exports.editskill = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const skillIndex = student.resume.skills.findIndex(i => i.id == req.params.skillid);
    student.resume.skills[skillIndex] = {...student.resume.skills[skillIndex], ...req.body};
    await student.save();

    res.status(200).json({
        message: "Skill Updated",
    })
})

exports.deleteskill = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredskill = student.resume.skills.filter(i => i.id !== req.params.skillid);
    student.resume.skills = filteredskill;
    await student.save();

    res.status(200).json({
        message: "Skill Deleted",
    })
})

// ---------------------accomplishment---------------------

exports.addaccomplishment = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({...req.body, id: uuidv4()});
    await student.save();

    res.status(200).json({
        message: "Accomplishment Added",
    })
})

exports.editaccomplishment = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const accomplishmentIndex = student.resume.accomplishments.findIndex(i => i.id == req.params.accomplishmentid);
    student.resume.accomplishments[accomplishmentIndex] = {...student.resume.accomplishments[accomplishmentIndex], ...req.body};
    await student.save();

    res.status(200).json({
        message: "Accomplishment Updated",
    })
})

exports.deleteaccomplishment = catchAsyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredaccomplishment = student.resume.accomplishments.filter(i => i.id !== req.params.accomplishmentid);
    student.resume.accomplishments = filteredaccomplishment;
    await student.save();

    res.status(200).json({
        message: "Accomplishment Deleted",
    })
})



