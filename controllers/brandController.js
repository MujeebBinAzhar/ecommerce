import brandModel from "../models/brandModel.js";
import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createBrandController = async (req, res) => {
  try {
    const { name } =  req.body;
    console.log("brand name",req.body);
  
    const brand = await brandModel.findOne({ name });
    if (brand) {
      return res.status(200).send({
        success: true,
        message: "brand already exists",
      });
    }

    const newBrand = new brandModel({
      name: name,
      slug: slugify(name),
    });

    
    await newBrand.save();

    res.status(200).send({
      success: true,
      message: "Brand created successfully",
      newBrand,
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





export const updateBrandController = async (req, res) => {
  try {
    const { name } = req.body;  
    const brand = await brandModel.findOne({ _id: req.params.id });

    if (brand) {
      const updatedBrand = await brandModel.findOneAndUpdate(
        { _id: req.params.id },
        { name: name, slug: slugify(name) },
        { new: true }
      );     
      await updatedBrand.save();

      return res.status(200).send({
        success: true,
        message: "Brand updated successfully",
        updatedBrand,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Brand not found",
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
};

export const getAllBrandsController = async (req, res) => {
  try {
    const brands = await brandModel.find({});
    if (brands) {
      res.status(200).send({
        success: true,
        message: "Brands fetched successfully",
        brands,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "No Brands found",
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
};

export const getSingleBrandController = async (req, res) => {
  try {
    const brand = await brandModel.findOne({ slug: req.params.slug });
    if (brand) {
      res.status(200).send({
        success: true,
        message: "Brand fetched successfully",
        brand,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "No sport found",
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
};

 
export const deleteBrandController = async (req, res) => {
  try {
    const brand = await brandModel.findOne({ _id: req.params.id });


    const productsInBrand = await productModel.find({ brand: req.params.id });

    if( productsInBrand.length > 0){
      return res.status(200).send({
        success: true,
        message: "Brand cannot be deleted as it contains products",
      });
    }

    if (brand) {
      await brandModel.findOneAndDelete({ _id: req.params.id });
      res.status(200).send({
        success: true,
        message: "brand deleted successfully",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "brand not found",
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
};

 


export const getBrandNameController = async (req, res) => {
  try {
       const id=req.params.id;

       const name = await brandModel.findOne({ _id: id }).select('name');
       console.log("name",name);
        if (name) {
          res.status(200).send({
            success: true,
            message: "Brand fetched successfully",
            data:name
          });
        }
        else {
          return res.status(200).send({
            success: true,
            message: "No Brand found",
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