const axios = require("axios");

setInterval(()=>{
    axios.get("https://payrollsystem-production.up.railway.app/")
    .then(()=> console.log("Keep server awake"))
    .catch(()=> console.log("Server asleep"));
}, 5*60*1000);