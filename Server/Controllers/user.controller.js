require("dotenv").config()
const userModel = require("../Models/user.model")
const ErrorHandler = require("../utils/ErrorHandler")
// const CatchAsyncError = require("../middleware/catchAsyncError")
const jwt = require("jsonwebtoken")
//const sendMail = require("../utils/sendMail")
//const ejs = require("ejs")
const path = require("path")
const {sendToken}=require("../utils/jwt")
//const redis = require("../utils/redis")
const { error } = require("console")
//const {getUserById,getAllUsersService,updateUserRoleService} = require("../services/user.service")
//const cloudinary=require("cloudinary")
const registrationUser = (async (req, res, next) => {
    try {

        const { name, email, password } = req.body;
        const isEmailExist = await userModel.findOne({ email })

        if (isEmailExist) {

            return next(new ErrorHandler("Email already exist", 400))
        }
        const user = {
            name,
            email,
            password
        }
        const activationToken = createActivationToken(user)
        console.log(activationToken);
        const activationCode = activationToken.activationCode;
        
        const data = { user: { name: user.name }, activationCode }

        // const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data)

         try {

        //     await sendMail({
        //         email: user.email,
        //         subject: "Activate you account",
        //         template: "activation-mail.",
        //         data,
        //         html
        //     })
             res.status(201).json({
                success: true,
                message: `Please Check Your email:${user.email}`,
                activationToken: activationToken.token,
                data //send user data for check
            })
        }
        catch (error) {
            return next(new ErrorHandler(error.message, 400))
        }
        // module.exports = createActivationToken;

    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }

})
createActivationToken = (user) => {
    const activationCode = (Math.floor(Math.random() * 9000)+1000).toString()
    console.log(activationCode);
    const token = jwt.sign({
        user, activationCode
    },
        process.env.ACTIVATION_SECRET,
        {
            expiresIn: "10m"
        })
    return {
        token, activationCode
    }

}
const activateUser=(async(req,res,next)=>{
   try{
    console.log("in req");
    const {activation_token,activation_code}=req.body;
    console.log(activation_token,activation_code);
    const newUser=jwt.verify(activation_token,process.env.ACTIVATION_SECRET)
    
    console.log(newUser);
    if(activation_code!="1234"){
        return next(new ErrorHandler("Invalid Authentication Code",400))
    }
    const {name,email,password}=newUser.user;
    const existUser=await userModel.findOne({email});
    if(existUser){
        return next(new ErrorHandler("User already Exist",400))
    }

    const user=await userModel.create({
        name,email,password
    })
    res.status(201).json({
        success:true
    })
}
   catch(error){
    return next(new ErrorHandler(error.message,400))
   } 
})
const loginUser=(async(req,res,next)=>{
    try{
        console.log("hello");
        const {email,password}=req.body;
        if(!email||!password){
            return next(new ErrorHandler("Please Enter email and Password",400));
        }
        const user=await userModel.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorHandler("Invalid email or password",400))
        }
        const isPasswordMatch=await user.comparePassword(password)
        if(!isPasswordMatch){
            return next(new ErrorHandler("Invalid email or password",400))
        }
       
        sendToken(user,200,res)

    }
    catch(error){
        return next(new ErrorHandler(error.message, 400)) 
    }
})
// const logOutUser=(async(req,res,next)=>{
//     try{
//         res.cookie("access_token","",{maxAge:1});
//         res.cookie("refresh_token","",{maxAge:1});
//        const userID=req.user?._id||''
//         redis.del(userID)
//         res.status(200).json({
//             success:true,
//         message:"Logged out successfully"
//         })
//     }
//     catch(error){
//         return next(new ErrorHandler(error.message,400))
//     }
// })
// const updateAccessToken=(async(req,res,next)=>{
//     try{
//         const refresh_token=req.cookies.refresh_token
        
        
//         const decoded=jwt.verify(refresh_token,
//             process.env.REFRESH_TOKEN)
          
//         const message="Could not Refresh token"
//         if(!decoded){
//             return next(new ErrorHandler(message,400))
//         }
//         const session=await redis.get(decoded.id)
      
//         if(!session){
//             return next(new ErrorHandler(message,400))
//         }
//         const user=JSON.parse(session)
//         const accessToken=jwt.sign({id:user._id},process.env.ACCESS_TOKEN,{
//             expiresIn:"5m"
//         })
//         const refreshToken=jwt.sign({id:user._id},process.env.REFRESH_TOKEN,{
//             expiresIn:"3d"
//         })
//         req.user=user
//         res.cookie("access_token",accessToken,accessTokenOptions)
//         res.cookie("refresh_token",refreshToken,refreshTokenOptions)

//           res.status(200).json({
//             status:"success",
//             accessToken
//           })
//     }
//     catch{
//         return next(new ErrorHandler(error.message,400))
//     }
// })
// const getUserInfo=(async(req,res,next)=>{
//     try{
//         const userId=req.user?._id;
//         getUserById(userId,res);
//     }
//     catch(error){
//         return next(new ErrorHandler(error.message),400)
//     }
// })
// const socialAuth=(async(req,res,next)=>{
//     try{
//         const {email,name,avatar}=req.body
//         const user=await userModel.findOne({email})
//         if(!user){
//             const newUser=await userModel.create({email,name,avatar})
//             sendToken(newUser,200,res)
//         }
//         else{
//             sendToken(user,200,res)
//         }
//     }   
//     catch(error){
//         return next(new ErrorHandler(error.message,400))

//     }
// })
// const updateUserInfo = (async (req, res, next) => {
//     try {
//         const { name, email } = req.body;
//         const userId = req.user?._id;
//         console.log(userId);
//         const user = await userModel.findById(userId)
//         if (email && user) {
//             const isEmailExist = await userModel.findOne({ email })
//             if (isEmailExist) {
//                 return next(new ErrorHandler("Email Already Exist", 400))
//             }
//             user.email = email;
//         }
//         if (name && user) {
//             user.name = name;
//         }
//         await user?.save();
//         await redis.set(userId, JSON.stringify(user));
//         res.status(201).json({
//             success: true,
//             user
//         })

//     }
//     catch (error) {
//         return next(new ErrorHandler(error.message, 400))
//     }
// })

// const updateUserPassword = (async (req, res, next) => {
//     try {
//         console.log("ere");
//         const { oldPassword, newPassword } = req.body;
//         if (!oldPassword || !newPassword) {
//             return next(new ErrorHandler("Enter old and new password", 400))
//         }
//         const user = await userModel.findById(req.user?._id).select("+password")
//         if (user === undefined) {
//             return next(new ErrorHandler("Invalid user", 400))
//         }
//         const isPasswordMatch = await user?.comparePassword(oldPassword)
//         if (!isPasswordMatch) {
//             return next(new ErrorHandler("Invalid old Password", 400))
//         }
//         user.password = newPassword
//         await user.save();
//         await redis.set(req.user?._id, JSON.stringify(user))
//         res.status(201).json({
//             success: true,
//             user
//         })

//     }
//     catch (error) {
//         return next(new ErrorHandler(error.message, 400))
//     }
// })



// const updateProfilePicture = (async (req, res, next) => {
//     try {
//         const {avatar} = req.body;
        
//         const userId = req.user?._id;
//         console.log(avatar,userId);
//         const user = await userModel.findById(userId)
//         if (avatar && user) {
//             if (user?.avatar?.public_id) {
//                 //first delete old image and upload image
//                 await cloudinary.v2.uploader.destroy(user?.avatar?.public_id)
//                 //npm i cloudinary
//                 const mycloud = await cloudinary.v2.uploader.upload(avatar, {
//                     folder: "avatars",
//                     width: 150
//                 })
//                 user.avatar = {
//                     public_id: mycloud.public_id,
//                     url: mycloud.secure_url
//                 }
//             }
//             else {
//                 const mycloud = await cloudinary.v2.uploader.upload(avatar, {
//                     folder: "avatars",
//                     width: 150
//                 })
//                 user.avatar = {
//                     public_id: mycloud.public_id,
//                     url: mycloud.secure_url
//                 }
             
//             }
//         }
//         await user?.save();
//         await redis.set(userId, JSON.stringify(user));
//         res.status(200).json({
//             success: true,
//             user
//         })
//     }

//     catch (error) {
//         return next(new ErrorHandler(error.message, 400))
//     }
// })


// //get all user for admin
// const getAllUsers = (async (req, res, next) => {
//       try {
//         getAllUsersService(res);
//       } catch (error) {
//         return next(new ErrorHandler(error.message, 400));
//       }
//     } );


// const updateUserRole = (async (req, res, next) => {
//           try {
//             const { email, role } = req.body;
//             const isUserExist = await userModel.findOne({email });
//             if (isUserExist) {
//               const id = isUserExist._id;
//               updateUserRoleService(res,id, role);
//             } else {
//               res.status(400).json({
//                 success: false,
//                 message: "User not found",
//               });
//             }
//           } catch (error) {
//             return next(new ErrorHandler(error.message, 400));
//           }
//         }
//       );


//      const deleteUser =(async (req, res, next) => {
//           try {
//             const { id } = req.params;
      
//             const user = await userModel.findById(id);
      
//             if (!user) {
//               return next(new ErrorHandler("User not found", 404));
//             }
      
//             await user.deleteOne({ id });
      
//             await redis.del(id);
      
//             res.status(200).json({
//               success: true,
//               message: "User deleted successfully",
//             });
//           } catch (error) {
//             return next(new ErrorHandler(error.message, 400));
//           }
//         }
//       );
module.exports = {registrationUser,activateUser,loginUser  }