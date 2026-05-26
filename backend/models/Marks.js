const mongoose = require("mongoose");

const marksSchema = mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true,
    },

    subject:{
        type:String,
        required:true,
    },

    marks:{
        type:Number,
        required:true,
    },

    grade:{
        type:String,
        required:true,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("Marks",marksSchema)