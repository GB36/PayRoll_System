const express = require("express");
const router = express.Router();
const {runPayroll} = require("../controllers/payrollController");
const auth = require("../middleware/auth");

router.post("/run", auth, runPayroll);

module.exports = router;