import express from 'express';
const router = express.Router();
import { requireSignIn, adminMiddleware } from '../middlewares/authMiddleware.js';
import { createCategoryController ,updateCategoryController,getAllCategoriesController,getSingleCategoryController,deleteCategoryController} from '../controllers/categoryController.js';


router.post('/create', requireSignIn, adminMiddleware, createCategoryController);

// update category
router.put('/update/:id', requireSignIn, adminMiddleware, updateCategoryController);

// get all categories
router.get('/getall',  getAllCategoriesController)


// single category

router.get('/get/:slug',  getSingleCategoryController) 

// delete category


router.delete('/delete/:id', requireSignIn, adminMiddleware, deleteCategoryController);


export default router;