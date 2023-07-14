import express from 'express';
import { adminMiddleware, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController,deleteProductController,getProductsController,updateProductController,getSingleProductController,getProductPhotoController } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

//routes

router.post('/create-product',requireSignIn,adminMiddleware,formidable(), createProductController);


//delete product

router.delete('/delete-product/:id', requireSignIn, adminMiddleware, deleteProductController);


//get products

router.get('/get-products', getProductsController);

//update product

router.put('/update-product/:id', requireSignIn, adminMiddleware,formidable(), updateProductController);

//get one product

router.get('/get-product/:id', getSingleProductController);

//get product photo

router.get('/product-photo/:id', getProductPhotoController);

export default router; 