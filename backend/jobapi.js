const express  = require("express");
const router   = express.Router();
module.exports = router;

const Job=require("./jobschema");

// Function to format date to dd-mm-yyyy
function formatDate(date) 
{
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero-based
    let year = date.getFullYear();

    // Pad day and month with leading zeros if necessary
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return `${day}-${month}-${year}`;
}

router.post("/addjob",async(req,res)=>{
    let formattedDate = formatDate(new Date());

    let newjob=Job({
        title:req.body.title,
        type: req.body.type,
        company:req.body.company,
        location:req.body.location,
        salary:req.body.salary,
        description:req.body.description,
        date:formattedDate
    })
    await newjob.save();
    res.status(200).json("Job Added Successfully")
})

router.get("/getdata",async(req,res)=>{
    let jobs= await Job.find();
    res.status(200).json(jobs);
})
