const jwt=require("jsonwebtoken");
let verifyToken=(req,res,next)=>{
    let tokenWithBearer=req.headers["authorization"];
    if(tokenWithBearer==undefined)
    {
        res.send({message:"Please login to continue"});
    }
    else{
        //extracting
        let token=tokenWithBearer.slice(7,tokenWithBearer.length);
        //console.log("token is ",token);
        //verify the token
        jwt.verify(token,process.env.secretkey,(err,decodedToken)=>{
            if(err)
            {
                res.send({message:"Please relogin to continue..."})
            }
            else
            {
                //forward re
                next();
            }
            //console.log("err is ",err);
            console.log("decodedToken is",decodedToken);
        })

    }
    //console.log("req headers obj is",);
}

module.exports=verifyToken;