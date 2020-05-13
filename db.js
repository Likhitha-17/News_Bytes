// //import mongodb driver
// var mc=require("mongodb").MongoClient;

// //to hold db object
// var dbo;
// var usercollectionobj;
// var admincollectionobj;
// var dataobj;
// var feedobj;
// var contObj;
// //database url
// var dburl=process.env.url;

// //function to initialize database
// function initDb(){
//     mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
//         if(err)
//         {
//             console.log("err in connecting to db");
//         }
//         console.log("conneced to db");
//         dbo=client.db("mydb");
//         usercollectionobj=dbo.collection("usercollection");
//         admincollectionobj=dbo.collection("admincollection");
//         dataobj=dbo.collection("data");
//         feedobj=dbo.collection("feedback");
//         contObj=dbo.collection("contactedInfo");
//     });
// }

// //function to return db obj
// function getDb()
// {
//     console.log(dbo,"Db has not been initialzed");
//     return{
//         usercollectionobj:usercollectionobj,
//         admincollectionobj:admincollectionobj,
//         dataobj:dataobj,
//         feedobj:feedobj,
//         contObj:contObj
//     }
// }
// //export modules
// module.exports={
//     initDb,getDb
// };