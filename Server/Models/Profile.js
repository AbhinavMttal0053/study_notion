const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
        // required:true,
    },
    about:{
        type:String,
        trim:true,
    },
    dateOfBirth:{
        type:String,
    },
    contactNumber:{
        type:Number,
        // required:true,
    }
})

module.exports = mongoose.model("Profile",profileSchema);