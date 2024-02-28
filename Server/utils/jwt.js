require("dotenv").config();
// const Redis=require("../utils/redis")

const accessTokenExpire=parseInt(
    process.env.ACCESS_TOKEN_EXP||'300',10);
const refreshTokenExpire=parseInt(
    process.env.REFRESH_TOKEN_EXP||'1200',10);

   const accessTokenOptions={
         expires:new Date(Date.now()+accessTokenExpire*60*60*1000),
        maxAge:accessTokenExpire*60*60*1000,
        httpOnly:true,
        sameSite:'lax'
    }
    const refreshTokenOptions={
        expires:new Date(Date.now()+refreshTokenExpire*24*60*60*1000),
        maxAge:refreshTokenExpire*24*60*60*1000,
        httpOnly:true,
        sameSite:'lax',
    };
const sendToken=(user,statusCode,res)=>{
   console.log("asdfg");
    const accessToken=user.SignAccessToken();
    console.log(accessToken);
    const refreshToken=user.SignRefreshToken();
    console.log(refreshToken);
  
   
   // Redis.set(user._id,JSON.stringify(user))
    //parse environment variable to integerate with fallback values
   
    res.cookie("access_token",accessToken,accessTokenOptions);
    res.cookie("refresh_token",refreshToken,refreshTokenOptions);
    res.status(statusCode).json({
       success:true,
       user,accessToken 
    })


 }
 module.exports={
    sendToken,accessTokenOptions,refreshTokenOptions
   };
