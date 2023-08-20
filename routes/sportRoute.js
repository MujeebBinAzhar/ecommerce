import express from "express";

const router = express.Router();

import {
  requireSignIn,
  adminMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  createSportController,
  updateSportController,
  getAllSportsController,
  getSingleSportController,
  deleteSportController,
  getSportPhotoController,
  getSportNameController,
} from "../controllers/sportController.js";

import formidable from "express-formidable";

router.post(
  "/create",
  requireSignIn,
  adminMiddleware,
  formidable(),
  createSportController
);

// update Sport

router.put(
  "/update/:id",
  requireSignIn,
  adminMiddleware,
  formidable(),
  updateSportController
);

// get all Sports
router.get("/getall", getAllSportsController);

// single Sport

router.get("/get/:slug", getSingleSportController);

//get Sport name

router.get("/get-name/:id", getSportNameController);

// delete Sport

router.delete(
  "/delete/:id",
  requireSignIn,
  adminMiddleware,
  deleteSportController
);

//Sport photo

router.get("/sport-photo/:id", getSportPhotoController);

export default router;
