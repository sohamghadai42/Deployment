require('dotenv').config()
const app = require('./src/app')
const connectionDB = require("./src/config/database")
connectionDB();
app.listen(4000, (req, res)=>{
    console.log("Server is started")
})