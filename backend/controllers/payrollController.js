const PayrollRun = require("../models/PayrollRun");
const Employee = require("../models/Employee");

//Salary Calculation LOgic

const calculateSalary = (employee) => {
    let basicSalary = employee.basicSalary;
    let allowances = employee.allowances || 0;
    let deduction = employee.deduction || 0;

    let netSalary = basicSalary + allowances - deduction;

    return {
        basicSalary,
        allowances,
        deduction, 
        netSalary
    };
};

exports.runPayroll = async (req, res) => {
    try{
        const {payPeriod} = req.body;
        if(!payPeriod){
            return res.status(400).json({
                message: "Please provide Pay Period"
            });
        }

        const employees = await Employee.find();
        if(employees.length === 0){
            return res.status(404).json({
                message: "No employees found"
            });
        }

        let processed = [];
        for(let emp of employees){
            const salary = calculateSalary(emp);

            const payRoll = new PayrollRun({
                employeeId: emp._id,
                basicSalary: salary.basicSalary,
                allowances: salary.allowances,
                deduction: salary.deduction,
                netSalary: salary.netSalary,
                payPeriod
            }); 

            await payRoll.save();
            processed.push(payRoll);
        }

        res.status(201).json({
            message: "Run completed successfully",
            data: processed
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "Payroll processing error"
        });
    }
};