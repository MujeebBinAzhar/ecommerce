import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
//protect user

export const requireSignIn = async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log("authorization", authorization);
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin middleware

export const adminMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "you are not admin",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error in admin middleware",
      error: error.message,
    });
  }
};
