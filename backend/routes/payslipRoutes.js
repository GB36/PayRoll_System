const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {getPayslip} = require("../controllers/payslipController");

router.get("/:employeeId/:payPeriod", auth, getPayslip);

module.exports = router;