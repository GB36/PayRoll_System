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
                <td>${emp.status}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

loadEmployees();

