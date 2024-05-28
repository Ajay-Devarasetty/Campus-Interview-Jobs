//schema--Structure of  a table.
const mongoose=require("mongoose");

const tableStructure = new mongoose.Schema({
    title        : { type:String, required:true },
    salary       : { type:String, required:true },
    type         : { type:String, required:true },
    company      : { type:String, required:true },
    location     : { type:String, required:true },
    description  : { type:String, required:true },
    date         : { type:String, required:true }
});

module.exports = mongoose.model("Job", tableStructure);

