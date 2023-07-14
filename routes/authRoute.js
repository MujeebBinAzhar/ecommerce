import express from "express";
import {registerController, loginController, forgotPasswordController} from "../controllers/authController.js";
import {requireSignIn, adminMiddleware } from "../middlewares/authMiddleware.js";
// router object

const router = express.Router();

//routing

//register user

router.post("/register", registerController);

//login route

router.post("/login", loginController)

//forgot password

router.post("/reset-password", forgotPasswordController)
 


//protected routes

router.get("/user-auth", requireSignIn,(req,res)=>{
  res.status(200).send({
    ok:true
  })
} )

router.get("/admin-auth", requireSignIn, adminMiddleware,(req,res)=>{
  res.status(200).send({
    ok:true
  })
})

export default router;