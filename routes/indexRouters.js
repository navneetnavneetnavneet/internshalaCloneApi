const express = require("express");
const { homepage } = require("../controllers/indexControllers");
const router = express.Router();

// GET /
router.get("/", homepage);

module.exports = router;
