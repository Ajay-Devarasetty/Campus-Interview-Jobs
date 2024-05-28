const express  = require("express");
const router   = express.Router();
// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');
// let path = require('path');

module.exports = router;
const User= require("./userschema");

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'images');
//     },
//     filename: function(req, file, cb) {   
//         cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// let upload = multer({ storage, fileFilter });

// router.route('/saveuser').post(upload.single('file'), (req, res) => {

//     const email=req.body.email;
//     const fullname=req.body.email;
//     const password=req.body.password;

//     const newuserData={
//         email,fullname,password
//     }
//     const newuser=new User(newuserData);
//     newuser.save()
//         .then(()=> res.json('User Added'))
//         .catch(err=>res.status(400).json('Error: '+ err));

// });


 //http://localhost:4444//saveuser
router.post("/saveuser", async(req, res)=>{
    let newuser = User({
        fullname:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    let info = await newuser.save();
    res.status(200).json( {"message" : "Registered Successfull"});
});

router.post("/login", async(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    let userinfo=await User.findOne({email:email,password:password});
    if(userinfo)
        res.status(200).json(userinfo);
    else
        res.status(200).json("User not exist");
});

router.post("/getdata", async(req,res)=>{
    let userid=req.body.userid;
    let info = await User.findOne({_id:userid});
    res.status(200).json(info);
})

router.post("/editdata", async(req,res)=>{
    let id=req.body.userid;
    let info = await User.findOne({_id:id});
    info.email=req.body.email;
    info.password=req.body.password;
    info.fullname=req.body.fullname;

    await info.save();
    res.status(200).json("updated successfully");
})