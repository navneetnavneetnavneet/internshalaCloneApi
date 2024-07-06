const express = require("express");
const { 
    homepage,
    studentsignup,
    studentsignin,
    studentsignout,
    currentstudent,
    studentsendmail,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavatar,
    applyinternship,
    applyjob,
 } = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/",  homepage);

// POST /student
router.post("/student", isAuthenticated, currentstudent);

// POST /student/signup
router.post("/student/signup", studentsignup);

// POST /student/signin
router.post("/student/signin", studentsignin);

// GET /student/signout
router.get("/student/signout", isAuthenticated, studentsignout);

// POST /student/sendmail
router.post("/student/sendmail", studentsendmail);

// GET /student/forget-link/:studentid
router.get("/student/forget-link/:id", studentforgetlink);

// POST /student/reset-password/:studentid
router.post("/student/reset-password/:id", isAuthenticated, studentresetpassword);

// POST /student/update/:studentid
router.post("/student/update/:id", isAuthenticated, studentupdate);

// POST /student/avatar/:studentid
router.post("/student/avatar/:id", isAuthenticated, studentavatar);

// ----------------apply internship--------------
// POST /student/apply/internship/:internshipid
router.post("/student/apply/internship/:internshipid", isAuthenticated, applyinternship);

// ----------------apply job--------------
// POST /student/apply/job/:jobid
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);

module.exports = router;
