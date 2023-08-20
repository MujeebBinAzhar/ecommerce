import express from 'express';
import { adminMiddleware, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController,deleteProductController,getProductsController,updateProductController,getSingleProductController,getProductPhotoController,getProductsByCategoryController,getFilteredProductsController,getTotalProductsController,getProductsPerPageController ,getProductAllPhotoController } from '../controllers/productController.js';
import formidable from 'express-formidable';
import upload from "../middlewares/multer.js"
import multer from 'multer';

const router = express.Router();

//routes

router.post('/create-product',requireSignIn,adminMiddleware, formidable({
  multiples: true,
} ),createProductController);


//delete product

router.delete('/delete-product/:id', requireSignIn, adminMiddleware, deleteProductController);


//get products

router.get('/get-products', getProductsController);

//update product

router.put('/update-product/:id', requireSignIn, adminMiddleware,formidable(
  {
    multiples: true,
  }
), updateProductController);

//get one product

router.get('/get-product/:id', getSingleProductController);

//get product photo

router.get('/product-photo/:id', getProductPhotoController);

//get all photos

router.get('/get-product-photos/:id', getProductAllPhotoController);


// products of same category

router.get('/products/:id', getProductsByCategoryController);

// product filter

router.post('/product-filters', getFilteredProductsController);


//product count

 router.get('/product-count', getTotalProductsController);

 // products per page

  router.get('/product-list/:page', getProductsPerPageController);

  // check products against one category

   
export default router; 