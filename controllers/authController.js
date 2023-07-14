import { compare } from "bcrypt";
import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,answer } = req.body;
    const hashedPassword = await hashPassword(password);

    //existing user
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(200).json({
        success: true,
        message: "User already exist",
      });
    }

    //register user 

    const newUser = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();

    //response
    res.status(200).send({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;    
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const match = await compare(password, user.password);

    if(!match){
      return res.status(401).json({
        success: false,
        message: "incorrect password",
      });
    }

    //generate token

    const token = JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
    res.status(200).json({
      success: true,
      message: "login successful",
      token: token,
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,

      },
    });
    

  } catch (error)  {
      console.log(error);
      res.status(500).json({
      success: false,
      message: "server error in login",
      error: error.message,
    });
  }
}

 

export const forgotPasswordController = async (req, res) => {
  try {
    const {email, answer, password} = req.body;

    //check if user exist
    const user = await userModel.findOne({email, answer});
    if(!user){
      return res.status(404).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    //hash new password
    const hashedPassword = await hashPassword(password);
     await userModel.findOneAndUpdate(user._id, {password: hashedPassword}, {new: true});
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
      
    });

    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "server error in forgot password",
    })
    
  }
}

