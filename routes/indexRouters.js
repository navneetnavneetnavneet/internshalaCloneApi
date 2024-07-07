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
  studentchangeemail,
  studentupdate,
  studentavatar,
  studentdelete,
  applyinternship,
  applyjob,
} = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/", homepage);

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
router.post("/student/forget-link/:id", studentforgetlink);

// POST /student/reset-password
router.post("/student/reset-password", isAuthenticated, studentresetpassword);

// POST /student/chnage-email
router.post("/student/change-email", isAuthenticated, studentchangeemail);

// POST /student/update/:studentid
router.post("/student/update/:id", isAuthenticated, studentupdate);

// POST /student/avatar/:studentid
router.post("/student/avatar/:id", isAuthenticated, studentavatar);

// GET /student/delete
router.get("/student/delete", isAuthenticated, studentdelete);

// ----------------apply internship--------------
// POST /student/apply/internship/:internshipid
router.post(
  "/student/apply/internship/:internshipid",
  isAuthenticated,
  applyinternship
);

// ----------------apply job--------------
// POST /student/apply/job/:jobid
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);

module.exports = router;
