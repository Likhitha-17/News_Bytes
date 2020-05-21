//install & import express
const exp=require("express")
//get express obj
const app=exp()
//install & import path
const path=require("path");
var mc=require("mongodb").MongoClient;

require("dotenv").config();

//import adminApp and userApp
const adminApp=require('./apis/adminapi');
const userApp=require('./apis/userapi');

app.use(exp.static(path.join(__dirname,'./dist/NEWSBYTES')))
//assign port number

//forwarding request object to apis
app.use("/admin",adminApp);
app.use("/user",userApp);

app.use((req,res,next)=>{
    res.send({message:`${req.url} and ${req.method} is invalid`});
})

var dburl=process.env.url;
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err)
    {
        console.log("err in connecting to db");
    }
    console.log("conneced to db");
    var dbo=client.db("mydb");
    // usercollectionobj=dbo.collection("usercollection");
    // admincollectionobj=dbo.collection("admincollection");
    // dataobj=dbo.collection("data");
    // feedobj=dbo.collection("feedback");
    // contObj=dbo.collection("contactedInfo");

    //share this "dbo" to api's
    app.locals.dbObject=dbo;

    // const port=5000;
    app.listen(process.env.PORT||8080,()=>{console.log(`server running on port ${process.env.PORT}`)});

});

