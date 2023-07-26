import userModel from "../models/userModel.js";



export const getAllUsers = async (req, res) => {
  try {

    const users = await userModel.find({}).select("-password");

    if (users) {
      res.status(200).send({
        success: true,
        totalUsers: users.length,
        message: "Users fetched successfully",
        users,
      });
    }
    else {
      return res.status(200).send({
        success: true,
        message: "No users found",
      });
    }
    
  } catch (error) {
     console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Internal server error",
    });
  }
}