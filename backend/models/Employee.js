const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true },
    email: { type: String, required: true },
    dateOfJoin: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", employeeSchema);

