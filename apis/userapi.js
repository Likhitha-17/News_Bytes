//create mini express appliatio to handle admin requests
const exp=require("express")
var bcrypt=require("bcrypt")
const userApp=exp.Router();

//import modules related to cloudinary
const cloudinary=require("cloudinary");
const cloudinaryStorage=require("multer-storage-cloudinary");
const multer=require("multer");

//configure cloudinary
cloudinary.config({
    cloud_name:process.env.cloudname,
    api_key:process.env.apikey,
    api_secret:process.env.apisecret
});

//configure cloudinary storage
var storageForCloudinary= cloudinaryStorage({
    cloudinary:cloudinary,
    folder:'vnrfiles',
    allowedFormats:['jpg','png'],
    filename:function(req,file,cb)
    {
        cb(undefined,file.fieldname+'-'+Date.now());
    }
});

//config multer
var upload=multer({storage:storageForCloudinary});

//use body parsing middleware
userApp.use(exp.json())

//import jsonwebtoken
const jwt=require("jsonwebtoken")

//import dbo from db.js
// const dbo=require('../db');
// dbo.initDb();


userApp.get('/readprofile/:username',(req,res)=>{
    res.send({message:"user profile works"})
});

userApp.post('/feedback',(req,res)=>{
    var dbo=req.app.locals.dbObject;
    // var feedOBj=dbo.getDb().feedobj;
    dbo.collection("feedback").insertOne(req.body,(err,success)=>{
        if(err)
        {
            console.log("err in posting feedback",err);
            res.send({message:'Error in posting Feedback'});
        }
        else{
            res.send({message:'Feedback Successfully given'})
        }
            
    })
})

userApp.post('/contact',(req,res)=>{
    var dbo=req.app.locals.dbObject;
    // var contObj=dbo.getDb().contObj;
    dbo.collection("contactedInfo").insertOne(req.body,(err,success)=>{
        if(err)
        {
            res.send({message:'Error in Contacting'});
        }
        else{
            res.send({message:'Information sent,We will contact you soon..!!'})
        }
    })
})

// userApp.post('/login',(req,res)=>{
//     res.send({message:"user login works"})
// });

userApp.post('/signup',upload.single("photo"),(req,res,next)=>{

    console.log("CDN link of uploaded is",req.file.secure_url);
    console.log(req.body);

    //check for username in db
    var dbo=req.app.locals.dbObject;
    // var userCollectionObj=dbo.getDb().usercollectionobj;

    //prepare req.body
    req.body=JSON.parse(req.body.userObj);
    req.body.profileImageUrl=req.file.secure_url;

    console.log("req body is",req.body);
    // console.log("req ")
    dbo.collection("usercollection").findOne({username:req.body.username},(err,userObjFromDB)=>{
        if(err)
        {
            console.log('error in register',err)
        }
        else if(userObjFromDB!=null)
        {
            res.send({message:'username already existed'});
        }
        else
        {   
            //hash password
            var hashedPassword=bcrypt.hashSync(req.body.password,7);
            req.body.password=hashedPassword;
            dbo.collection("usercollection").insertOne(req.body,(err,success)=>{
                if(err)
                {
                    console.log('error');
                }
                else
                {
                    res.send({message:'register successfull'});
                }
            })
        }
    })
});

userApp.post('/login',(req,res)=>{
    var dbo=req.app.locals.dbObject;
    // var userCollectionObj=dbo.getDb().usercollectionobj;
    //verify username
    dbo.collection("usercollection").findOne({username:req.body.username},(err,userObj)=>{
        if(err)
        {
            console.log("err in read",err);
        }
        else if(userObj==null)
        {
            res.send({message:"invalid username"})
        }
        else{
            bcrypt.compare(req.body.password,userObj.password,(err,result)=>{
                if(err)
                {
                    console.log("err in compare",err)
                }
                else if(result==false)
                {
                    res.send({message:"invalid password"})
                }
                else{
                    //create a token and send it to client
                    jwt.sign({username:userObj.username},process.env.secretkey,{expiresIn:60},(err,signedToken)=>{
                        if(err)
                        {
                            console.log("err in sign",err)
                        }
                        else
                        {
                            res.send({message:signedToken,username:userObj.username,image:userObj.profileImageUrl});
                        }
                    })
                }
            })
        }
    })
    console.log("user obj is",req.body)
})

const verifyToken=require("../middlewares/verifyToken");

//test req handler
userApp.get('/test',verifyToken,(req,res)=>{
    res.send({message:"test is working"});
    //console.log("working");
    console.log("req handler is ",req.headers.authorization);
})
//login request handler
// userApp.post('/login',(req,res)=>{
//     var userCollectionObj=dbo.getDb().usercollectionobj;
//     //verify username
//     userCollectionObj.findOne({username:req.body.username},(err,userObj)=>{
//         if(err)
//         {
//             console.log("err in read",err);
//         }
//         else if(userObj==null)
//         {
//             res.send({message:"invalid username"})
//         }
//         else{
//             bcrypt.compare(req.body.password,userObj.password,(err,result)=>{
//                 if(err)
//                 {
//                     console.log("err in compare",err)
//                 }
//                 else if(result==false)
//                 {
//                     res.send({message:"invalid password"})
//                 }
//                 else{
//                     //create a token and send it to client
//                     jwt.sign({username:userObj.username},'ssshhh',{expiresIn:60},(err,signedToken)=>{
//                         if(err)
//                         {
//                             console.log("err in sign",err)
//                         }
//                         else
//                         {
//                             res.send({message:signedToken,username:userObj.username})
//                         }
//                     })
//                 }
//             })
//         }
//     })
//     console.log("user obj is",req.body)
// })

//used to handle businesslogic errors
userApp.use((err,req,res,next)=>{
    res.send({message:err.message})
})

//export adminApp
module.exports=userApp;

 //create mini express app to handle user reqs
// const exp=require("express")
// const userApp=exp.Router();

// //import dbo from db.js
// const dbo=require('../db')
// dbo.initDb();


// userApp.get('/readprofile/:username',(req,res)=>{
//     res.send({message:"User Read Profile"});
// });

// userApp.post('/login',(req,res)=>{
//     res.send({message:"User login works"});
// });

// userApp.post('/register',(req,res)=>{
//     res.send({message:"User register"});
// })

// //export userApp
// module.exports=userApp;