const mongoose = require('mongoose')
const dns = require('dns')

dns.setServers(['8.8.8.8', '1.1.1.1'])

async function connectToDb(){
    try{
        const db = await mongoose.connect(process.env.MONGO_URI)
        const connected = db.textContent = "Connected to Db"
        console.log(connected)
    }catch(err){
        console.log("Connecting to DB failed:", err.message)
    }
}

module.exports = connectToDb