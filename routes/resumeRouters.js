const express = require("express");
const router = express.Router();
const { 
    resume,
    addeducation,
    editeducation,
    deleteeducation,
    addjob,
    editjob,
    deletejob,
    addinternship,
    editinternship,
    deleteinternship,
    addresponsibilitie,
    editresponsibilitie,
    deleteresponsibilitie,
    addcourse,
    editcourse,
    deletecourse,
    addproject,
    editproject,
    deleteproject,
    addskill,
    editskill,
    deleteskill,
    addaccomplishment,
    editaccomplishment,
    deleteaccomplishment,
 } = require("../controllers/resumeControllers");
const { isAuthenticated } = require("../middlewares/auth");

// GET /
router.get("/", isAuthenticated, resume);


// POST /resume/add-edu
router.post("/add-edu", isAuthenticated, addeducation);

// POST /resume/edit-edu/:eduid
router.post("/edit-edu/:eduid", isAuthenticated, editeducation);

// POST /resume/delete-edu/:eduid
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation);


// POST /resume/add-job
router.post("/add-job", isAuthenticated, addjob);

// POST /resume/edit-job/:jobid
router.post("/edit-job/:jobid", isAuthenticated, editjob);

// POST /resume/delete-job/:jobid
router.post("/delete-job/:jobid", isAuthenticated, deletejob);


// POST /resume/add-internship
router.post("/add-internship", isAuthenticated, addinternship);

// POST /resume/edit-internship/:internshipid
router.post("/edit-internship/:internshipid", isAuthenticated, editinternship);

// POST /resume/delete-internship/:internshipid
router.post("/delete-internship/:internshipid", isAuthenticated, deleteinternship);


// POST /resume/add-responsibilitie
router.post("/add-responsibilitie", isAuthenticated, addresponsibilitie);

// POST /resume/edit-responsibilitie/:responsibilitieid
router.post("/edit-responsibilitie/:responsibilitieid", isAuthenticated, editresponsibilitie);

// POST /resume/delete-responsibilitie/:responsibilitieid
router.post("/delete-responsibilitie/:responsibilitieid", isAuthenticated, deleteresponsibilitie);


// POST /resume/add-course
router.post("/add-course", isAuthenticated, addcourse);

// POST /resume/edit-course/:courseid
router.post("/edit-course/:courseid", isAuthenticated, editcourse);

// POST /resume/delete-course/:courseid
router.post("/delete-course/:courseid", isAuthenticated, deletecourse);


// POST /resume/add-project
router.post("/add-project", isAuthenticated, addproject);

// POST /resume/edit-project/:projectid
router.post("/edit-project/:projectid", isAuthenticated, editproject);

// POST /resume/delete-project/:projectid
router.post("/delete-project/:projectid", isAuthenticated, deleteproject);


// POST /resume/add-skill
router.post("/add-skill", isAuthenticated, addskill);

// POST /resume/edit-skill/:skillid
router.post("/edit-skill/:skillid", isAuthenticated, editskill);

// POST /resume/delete-skill/:skillid
router.post("/delete-skill/:skillid", isAuthenticated, deleteskill);


// POST /resume/add-accomplishment
router.post("/add-accomplishment", isAuthenticated, addaccomplishment);

// POST /resume/edit-accomplishment/:accomplishmentid
router.post("/edit-accomplishment/:accomplishmentid", isAuthenticated, editaccomplishment);

// POST /resume/delete-accomplishment/:accomplishmentid
router.post("/delete-accomplishment/:accomplishmentid", isAuthenticated, deleteaccomplishment);

module.exports = router;
