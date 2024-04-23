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

// POST /employe/reset-password/:studentid
router.post("/reset-password/:id", isAuthenticated, employeresetpassword);

// POST /employe/update/:studentid
router.post("/update/:id", isAuthenticated, employeupdate);

// POST /employe/avatar/:studentid
router.post("/avatar/:id", isAuthenticated, employeavatar);

module.exports = router;
