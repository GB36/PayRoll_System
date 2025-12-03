const token = localStorage.getItem("token");

if(!token){
    window.location.href = "./login.html";
}

document.getElementById("welcome").innerText = "Welcome to the Dashboard!";

//error on line 7 check it later