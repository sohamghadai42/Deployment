const mongoose = require('mongoose')

function connectionDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database is connected")
    })

}
module.exports = connectionDB