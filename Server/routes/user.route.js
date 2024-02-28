const express = require("express")
const UserControl = require("../Controllers/user.controller");
//const {isAuthenticated,authorizeRoles} = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post('/registration', UserControl.registrationUser)

userRouter.post('/activate-user',UserControl.activateUser)
userRouter.post('/login',UserControl.loginUser)
// userRouter.get('/logout',isAuthenticated,UserControl.logOutUser)
// userRouter.get('/me',isAuthenticated,UserControl.getUserInfo)
// userRouter.post('/social-Auth',UserControl.socialAuth)
// userRouter.put('/update-user-info',isAuthenticated,UserControl.updateUserInfo)
// userRouter.put('/update-user-password',isAuthenticated,UserControl.updateUserPassword)
// userRouter.put('/update-user-avatar',isAuthenticated,UserControl.updateProfilePicture)
// userRouter.get('/refreshtoken',UserControl.updateAccessToken)
// userRouter.get("/get-users",isAuthenticated,authorizeRoles("admin"),UserControl.getAllUsers)

// userRouter.put("/update-user",isAuthenticated,authorizeRoles("admin"),UserControl.updateUserRole);
  
// userRouter.delete("/delete-user/:id",isAuthenticated,authorizeRoles("admin"),UserControl.deleteUser);
module.exports = userRouter;