const express =require("express");      // calling exprss framewok
const app = express();                  // creating object of express
const cors =require("cors");            // calling cors orgin library to allow data communication between 2 servers
app.use(cors());                        // creating object of cors library
app.use(express.json());  

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/backend")
const db = mongoose.connection;

db.on("error", (error)=>console.log("Error in database connection"));
db.on("open", ()=>console.log("Database is connected....."));
 
const User  = require("./userapi");
const Job   = require("./jobapi");
const Apply = require("./appliedapi"); 

app.use("/user",User);
app.use("/job",Job);
app.use("/apply",Apply);

app.listen(4444,function(){
    console.log("The Server is live....");
})
