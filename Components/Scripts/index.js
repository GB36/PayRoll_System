function viewPayslip(employeeId, period){
    fetch(`http://localhost:5000/api/payslip/${employeeId}/${period}`, {
        headers:{
            "Authorization": "Bearer" + localStorage.getItem("token")
        }
    })

        .then(res => res.json())
        .then(data => {
            console.log("Payslip =", data.payslip);
        });
}