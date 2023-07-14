import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, price, description, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
     

    const product = await productModel.findOne({ name,category });
    if (product) {
      return res.status(200).send({
        success: true,
        message: "Product already exists In this Category",
      });
    }
    const newProduct =  new productModel({
      name: name,
      slug: slugify(name),
      price: price,
      description: description,
      category: category,
      quantity: quantity,
      shipping: shipping,
      
    });
    if (photo) {
      if (photo.size > 1000000) {
        return res.status(200).send({
          success: true,
          message: "Image size too large",
        });        
    }
    newProduct.photo.data = fs.readFileSync(photo.path);
    newProduct.photo.contentType = photo.type;
    }
    await newProduct.save();
    res.status(200).send({
      success: true,
      message: "Product created successfully",
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Internal server error",
    });
  }
};


export const deleteProductController = async (req, res) => {
  try {

    const product = await productModel.findOne({ _id: req.params.id });
    if (product) {
      await productModel.findOneAndDelete({ _id: req.params.id });
      res.status(200).send({
        success: true,
        message: "Product deleted successfully",
      });
    }
    else {
      return res.status(200).send({
        success: true,
        message: "Product not found",
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

export const updateProductController = async (req, res) => {
  try {
    const { name, price, description, category, quantity, shipping } =
      req.fields;
    // const { photo } = req.files;

    const product = await productModel.findOne({ _id: req.params.id });
    if (product) {
      const updatedProduct = await productModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: name,
          slug: slugify(name),
          price: price,
          description: description, 
          category: category,
          quantity: quantity,
          shipping: shipping,
        },
        { new: true }
      );
      if (photo) {
        if (photo.size > 1000000) {
          return res.status(200).send({
            success: true,
            message: "Image size too large",
          });        
      }
      updatedProduct.photo.data = fs.readFileSync(photo.path);
      updatedProduct.photo.contentType = photo.type;
      }
      await updatedProduct.save();
      res.status(200).send({
        success: true,
        message: "Product updated successfully",
        updatedProduct,
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

export const getProductsController = async (req, res) => {
  try {
    const products = await productModel.find({}).select("-photo").limit(10).sort({createdAt:-1}).populate("category");
    if (products) {
      res.status(200).send({
        success: true,
        totalProducts: products.length,
        message: "Products fetched successfully",
        products,
        
      });
    }
    else {
      return res.status(200).send({
        success: true,
        message: "No products found",
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

export const getSingleProductController = async (req, res) => {
  try {
    
  const product = await productModel.findOne({ _id: req.params.id }).select("-photo").populate("category");
  if (product) {
    res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  }
  else {
    return res.status(200).send({
      success: true,
      message: "Product not found",
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

export const getProductPhotoController = async (req, res) => {

  try {
    const product = await productModel.findOne({ _id: req.params.id }).select("photo");
    if(product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    else {
      return res.status(200).send({
        success: true,
        message: "Product photo not found",
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