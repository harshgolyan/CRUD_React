const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const formSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    hobbies:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Form",formSchema)