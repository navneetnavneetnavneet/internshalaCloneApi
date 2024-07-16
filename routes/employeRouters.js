const express = require("express");
const {
  homepage,
  employesignup,
  employesignin,
  employesignout,
  currentemploye,
  employesendmail,
  employeforgetlink,
  employeresetpassword,
  employeupdate,
  employeavatar,
  employedelete,
  internshipcreate,
  readinternship,
  readsingleinternship,
  jobcreate,
  readjob,
  readsinglejob,
} = require("../controllers/employeControllers");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /
router.get("/", homepage);

// POST /student
router.post("/current", isAuthenticated, currentemploye);

// POST /employe/signup
router.post("/signup", employesignup);

// POST /employe/signin
router.post("/signin", employesignin);

// GET /employe/signout
router.get("/signout", isAuthenticated, employesignout);

// POST /employe/sendmail
router.post("/sendmail", employesendmail);

// GET /employe/forget-link/:studentid
router.get("/forget-link/:id", employeforgetlink);

// POST /employe/reset-password
router.post("/reset-password", isAuthenticated, employeresetpassword);

// POST /employe/update
router.post("/update", isAuthenticated, employeupdate);

// POST /employe/avatar/:studentid
router.post("/avatar/:id", isAuthenticated, employeavatar);

// GET /employe/delete
router.get("/delete", isAuthenticated, employedelete);

// POST /employe/internship/create
router.post("/internship/create", isAuthenticated, internshipcreate);

// POST /employe/internship/read
router.post("/internship/read", isAuthenticated, readinternship);

// POST /employe/internship/read/:id
router.post("/internship/read/:id", isAuthenticated, readsingleinternship);

// POST /employe/job/create
router.post("/job/create", isAuthenticated, jobcreate);

// POST /employe/job/read
router.post("/job/read", isAuthenticated, readjob);

// POST /employe/job/read/:id
router.post("/job/read/:id", isAuthenticated, readsinglejob);

module.exports = router;
