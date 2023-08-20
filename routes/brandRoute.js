import express from "express";
const router = express.Router();
import {
  requireSignIn,
  adminMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  createBrandController,
  updateBrandController,
  getAllBrandsController,
  getSingleBrandController,
  deleteBrandController,
  getBrandNameController,
} from "../controllers/brandController.js";

import formidable from "express-formidable";

router.post(
  "/create",
  requireSignIn,
  adminMiddleware, 
  createBrandController
);

// update Brand

router.put(
  "/update/:id",
  requireSignIn,
  adminMiddleware,
 
  updateBrandController
);

// get all Brands
router.get("/getall", getAllBrandsController);

// single Brand

router.get("/get/:slug", getSingleBrandController);

//get Brand name

router.get("/get-name/:id", getBrandNameController);

// delete Brand

router.delete(
  "/delete/:id",
  requireSignIn,
  adminMiddleware,
  deleteBrandController
);

export default router;
