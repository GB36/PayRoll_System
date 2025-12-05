async function loadEmployees(){
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/employees", {
        headers: {
            "Authoraization": "Bearer " + token
        }
    });

    const data = await response.json();
    const tbody = document.querySelector("#employeeTable tbody");

    data.forEach(emp => {
        const row = `
            <tr>
                <td>${emp.fullname}</td>
                <td>${emp._id}</td>
                <td>${emp.department}</td>
                <td>${emp.position}</td>
                <td>${emp.salary}</td>
                <td>${emp.email}</td>
                <td>${emp.status}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

loadEmployees();

//To open the Popup
document.getElementById("addEmployee").addEventListener("click", () => {
    document.getElementById("employeePopup").style.display = "flex";
});

//To close the popup
document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("employeePopup").style.display = "none";
});

document.getElementById("saveEmployee").addEventListener("click", async () => {

    const fullname = document.getElementById("empName").value;
    const email = document.getElementById("empEmail").value;
    const department = document.getElementById("empDepartment").value;
    const position = document.getElementById("empPosition").value;
    const salary = document.getElementById("empSalary").value;
    const date = document.getElementById("empDate").value;

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            fullname,
            email,
            department,
            position,
            salary,
            date
        })
    });

    const data = await response.json();

    if(response.ok){
        alert("Emplopyee added successfully!");
        document.getElementById("employeePopup").style.display = "none";
    }else{
        alert("data.message");
    }
});

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


