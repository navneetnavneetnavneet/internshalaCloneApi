const express = require("express");
const { 
    homepage,
    studentsignup,
    studentsignin,
    studentsignout,
    currentstudent,
    studentsendmail,
    studentforgetlink,
 } = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/", isAuthenticated, homepage);

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

module.exports = router;
