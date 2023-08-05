import express from 'express';
const router = express.Router();
import { requireSignIn, adminMiddleware } from '../middlewares/authMiddleware.js';
import { createCategoryController ,updateCategoryController,getAllCategoriesController,getSingleCategoryController,deleteCategoryController,getCategoryPhotoController,getCategoryNameController} from '../controllers/categoryController.js';
import formidable from "express-formidable"

router.post('/create', requireSignIn, adminMiddleware,formidable(), createCategoryController);

// update category
router.put('/update/:id', requireSignIn, adminMiddleware,formidable(), updateCategoryController);

// get all categories
router.get('/getall',  getAllCategoriesController)


// single category

router.get('/get/:slug',  getSingleCategoryController) 

//get category name

router.get('/get-name/:id',  getCategoryNameController)
 

// delete category




router.delete('/delete/:id', requireSignIn, adminMiddleware, deleteCategoryController);

//category photo

router.get('/category-photo/:id',  getCategoryPhotoController)


export default router;