const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.DATABASE_URL)

const database = mongoose.connection

database.on('error',
console.error.bind(console,'not connected'))

database.on('connected',()=>{
    console.log('Successfully Connected');
})

module.exports = database
// database.once('open',()=>{
//     console.log('Successfully Connected');
// });