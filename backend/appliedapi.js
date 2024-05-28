const express  = require("express");
const router   = express.Router();
module.exports = router;

const Apply=require("./applyschema");

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

router.post("/applyjob", async(req,res)=>{
    let formattedDate = formatDate(new Date());
    let newjob=Apply({
        title:req.body.title,
        type: req.body.type,
        company:req.body.company,
        location:req.body.location,
        salary:req.body.salary,
        description:req.body.description,
        posted:req.body.date,
        userid:req.body.userid,
        applied:formattedDate,
        jobid:req.body.jobid
    })
    await newjob.save();
    res.status(200).json("Applied Successfully");
})

router.post("/appliedjobs",async(req,res)=>{
    let userid=req.body.userid;
    let jobs=await Apply.find({userid:userid});
    res.status(200).json(jobs);
})