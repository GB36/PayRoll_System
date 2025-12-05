async function runPayroll() {
    const token = localStorage.getItem("token");
    const period = document.getElementById("period").value;

    const basicSalary = document.getElementById("salary").value;
    const allowances = document.getElementById("allowances").value;
    const deductions = document.getElementById("deductions").value;
    const netSalary = "";

    const response = await fetch("http://localhost:5000/api/payroll/run", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            payPeriod: period
        })
    });

    const data = await response.json();

    if(response.ok){
        document.getElementById("message").innerText = "Payroll run successful!";
    }else{
        document.getElementById("message").innerText = data.message;
    }   
}

//THIS WILL BE THE FUNCTIONALITY OF THE NAVBAR BUTTONS
//DASHBOARD
document.getElementById("nav_dashboard").addEventListener("click", ()=> {
    window.location.href = "./Dashboard.html";
})
//EMPLOYEE
document.getElementById("nav_employee").addEventListener("click", ()=> {
    window.location.href = "./Employees.html";
})
//PAYROLL RUN 
document.getElementById("nav_payroll").addEventListener("click", ()=> {
    window.location.href = "./Payroll.html";
})
//PAYSLIPS
document.getElementById("nav_payslip").addEventListener("click", ()=> {
    window.location.href = "./Payslip.html";
})
//SETTINGS
document.getElementById("nav_setting").addEventListener("click", ()=> {
    window.location.href = "./Setting.html";
})
