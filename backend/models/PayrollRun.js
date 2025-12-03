const mongoose  = require("mongoose");

const payrollRunSchema = new mongoose.Schema(
    {
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },

        basicSalary: {
            type: Number,
            required: true
        },
        
        allowances: {
            type: Number,
            default: 0
        },
        
        deduction: {
            type: Number,
            default: 0
        },

        netSalary: {
            type: Number,
            default: 0
        },

        payPeriod: {
            type: String,   //e.g., "2025-12"
            required: true
        },

        status: {
            type: String,
            enum: ["Pending", "Completed", "Failed"],
            default: "Pending"
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("PayrollRun", payrollRunSchema);
