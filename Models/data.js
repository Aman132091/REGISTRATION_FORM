const mongoose = require('mongoose')
 const dataSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true

    },
    content:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
 },{timestamps:true})

 const Data = mongoose.model('Data',dataSchema)

 module.exports = Data;