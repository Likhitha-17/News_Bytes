//create mini express app to handle admin reqs
const exp=require("express")
var bcrypt=require("bcrypt")
const adminApp=exp.Router();
adminApp.use(exp.json())

//import dbo from db.js
// const dbo=require('../db')
// dbo.initDb();

// adminApp.get('/readprofile/:username',(req,res)=>{
//     res.send({message:"Admin Read Profile"});
// });

adminApp.get('/readnow/articles',(req,res)=>{
    var dbo=req.app.locals.dbObject;
    // var data=dbo.getDb().dataobj;
    //  console.log(req);
    //  res.send({message:"1234567"})
    dbo.collection("data").find({}).toArray(function(err,datada)
    {
        if(err)
        console.log("err in getting")
        else
        {
            res.send({message:datada});
        }
        
    })
})

adminApp.get('/admindashboard',(req,res)=>{
    var dbo=req.app.locals.dbObject;
    // var feedback=dbo.getDb().feedobj;
    dbo.collection("feedback").find({}).toArray(function(err,review)
    {
        if(err)
            res.send({message:"err in getting feedback"});
        else
            res.send({message:review});
    })
})

adminApp.get('/usercontacted',(req,res)=>{
    var dbo=req.app.locals.dbObject;
    // var contObj=dbo.getDb().contObj;
    dbo.collection("contactedInfo").find({}).toArray(function(err,contacts)
    {
        if(err)
            res.send({message:"err in getting Contact Info!!"});
        else
            res.send({message:contacts});
    })
})

adminApp.post('/forget-password',(req,res)=>{
    var dbo=req.app.locals.dbObject;
    // var usercollectionObj =dbo.getDb().usercollectionobj;
    dbo.collection("usercollection").findOne({username:req.body.username},(err,resetp)=>{
        if(err)
        {
            console.log("err in reseting",err);
        }
        else if(resetp==null)
        {
            // console.log(resetp);
            res.send({message:"invalid username"})
        }
        else{
            var hashedPassword=bcrypt.hashSync(req.body.password,7);
            req.body.password=hashedPassword;
            dbo.collection("usercollection").updateOne({password:resetp.password},{$set:{password:req.body.password}},null,function(err,success){
                if(err)
                    console.log(err);
                else
                    res.send({message:'Password reset successfull'});
            })
        }
    })
})

adminApp.post('/login', (req, res) => {
    var dbo=req.app.locals.dbObject;
    // var adminCollectionObj = dbo.getDb().admincollectionobj;
    //verify usernamea
    dbo.collection("admincollection").find({ username: req.body.username }).toArray(function (err, adminObj) {
        if (err) {
            console.log("err in read", err);
        }
        else if (adminObj.length == 0) {
            res.send({ message: "invalid username" })
        }
        else {
            if (req.body.password != adminObj[0].password) {
                res.send({ message: "invalid password" })
            }
            else {
                res.send({message:req.body.username});
            }
            
        }
    })
})

// adminApp.post('/login',(req,res)=>{
//     res.send({message:"Admin login works"});
// });

adminApp.use((err,req,res,next)=>{
    res.send({message:err.message})
})

//export adminApp
module.exports=adminApp;