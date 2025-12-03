const PayrollRun = require("../models/PayrollRun");
const EMployee =  require("../models/Employee");

exports.getPayslip = async (req, res) => {
    try{
        const {employeeId, payPeriod} = req.params;

        const payroll = await PayrollRun.findOne({
            employeeId,
            payPeriod
        }).populate("employeeId", "fullname email position department");

        if(!payroll){
            return res.status(404).json({
                message: "Payslip not found for this employee and period"
            });
        }

        const payslip = {
            employee: payroll.employeeId,
            basicSalary: payroll.basicSalary,
            allowances: payroll.allowances,
            deduction: payroll.deduction,
            netSalary: payroll.netSalary,
            payPeriod: payroll.payPeriod,
            generatedAt: new Date()
        };

        res.status(200).json({
            message: "Payslip Loaded", payslip
        });
    } catch (error){
        console.log(error);
        res.status(500).json({
            message: "Error generating payslip"
        });
    }


};