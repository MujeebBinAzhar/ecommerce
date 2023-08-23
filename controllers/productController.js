import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import crypto from "crypto";
import formidable from "formidable";
import { fileURLToPath } from "url";

import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      details,
      category,
      discount,
      shipping,
      sport,
      brand,
      popular,
      isnew,
      trending,
    } = req.fields;
    const { photo } = req.files;
    const { photos } = req.files;

    const features = JSON.parse(req.fields.features);

    // get vairiants array too
    const variants = JSON.parse(req.fields.variants);

    console.log("variants", variants  )

    const product = await productModel.findOne({ name, category });

    if (product) {
      return res.status(200).send({
        success: true,
        message: "Product already exists In this Category",
      });
    }

    const newProduct = new productModel({
      name: name,
      slug: slugify(name),
      price: price,
      description: description,
      details: details,
      category: category,
      discount: discount,
      shipping: shipping,
      sport: sport,
      brand: brand,
      features: features,
      popular: popular,
      isnew: isnew,
      trending: trending,
      variants: variants,
    });

   

    if (photo) {
      if (photo.size > 1500000) {
        return res.status(200).send({
          success: false,
          message: "Image size too large",
        });
      }
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }

    if (photos && Array.isArray(photos)) {
      const arrayOfPhotoPaths = [];

      photos.forEach((photo) => {
        if (photo.size > 1500000) {
          return res.status(200).json({
            success: false,
            message: "Additional photo size too large",
          });
        }

        const fileExtension = photo.name.split(".").pop();
        const randomFilename = `${crypto
          .randomBytes(8)
          .toString("hex")}_${Date.now()}.${fileExtension}`;

        const additionalPhotoPath = path.join(
          __dirname,
          "../uploads/additionalPhotos",
          randomFilename
        );

        console.log("additionalPhotoPath", additionalPhotoPath);

        try {
          fs.promises.copyFile(photo.path, additionalPhotoPath);
          arrayOfPhotoPaths.push(randomFilename);
          newProduct.photos.push(randomFilename);
        } catch (error) {
          console.error("Error saving additional photo:", error);
          return res.status(500).json({
            success: false,
            message: "Error saving additional photo",
          });
        }
      });
    }

    await newProduct.save();
    res.status(200).send({
      success: true,
      message: "Product created successfully",
      // newProduct,
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

export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      details,
      category,
      discount,
      shipping,
      sport,
      brand,
      popular,
      isnew,
      trending,
    } = req.fields;
   

    const { photo, morephotos } = req.files;
    const photos = JSON.parse(req.fields.photos);

    const features = JSON.parse(req.fields.features);

    const variants = JSON.parse(req.fields.variants);

    const product = await productModel.findOne({ _id: req.params.id });

    if (product) {
      const updatedProduct = await productModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: name,
          slug: slugify(name),
          price: price,
          description: description,
          details: details,
          category: category,
          discount: discount,
          shipping: shipping,
          sport: sport,
          brand: brand,
          photos: photos,
          features: features,
          popular: popular,
          isnew: isnew,
          trending: trending,
          variants: variants,
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

      if (morephotos && Array.isArray(morephotos)) {
        const arrayOfPhotoPaths = [];

        morephotos?.forEach((photo) => {
          if (photo.size > 1500000) {
            return res.status(200).json({
              success: false,
              message: "Additional photo size too large",
            });
          }

          const fileExtension = photo.name.split(".").pop();
          const randomFilename = `${crypto
            .randomBytes(8)
            .toString("hex")}_${Date.now()}.${fileExtension}`;

          const additionalPhotoPath = path.join(
            __dirname,
            "../uploads/additionalPhotos",
            randomFilename
          );

          console.log("additionalPhotoPath", additionalPhotoPath);

          try {
            fs.promises.copyFile(photo.path, additionalPhotoPath);
            arrayOfPhotoPaths.push(randomFilename);
            updatedProduct.photos.push(randomFilename);
          } catch (error) {
            console.error("Error saving additional photo:", error);
            return res.status(500).json({
              success: false,
              message: "Error saving additional photo",
            });
          }
        });
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
    } else {
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
};

export const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });
    if (products) {
      res.status(200).send({
        success: true,
        totalProducts: products.length,
        message: "Products fetched successfully",
        products,
      });
    } else {
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
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ _id: req.params.id })
      .select("-photo")
      .populate("category")
      .populate("sport")
      .populate("brand");
    if (product) {
      res.status(200).send({
        success: true,
        message: "Product fetched successfully",
        product,
      });
    } else {
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
};

export const getProductPhotoController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ _id: req.params.id })
      .select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    } else {
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
};

export const getProductAllPhotoController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ _id: req.params.id })
      .select("photos");
    console.log("product", product);
    if (product.photos.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Product photos fetched successfully",
        productPhotos: product.photos,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "Product photos not found",
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

export const getProductsByCategoryController = async (req, res) => {
  try {
    const products = await productModel
      .find({ category: req.params.id })
      .select("-photo")
      .sort({ createdAt: -1 });
    if (products) {
      res.status(200).send({
        success: true,
        totalProducts: products.length,
        message: "Products fetched successfully",
        products,
      });
    } else {
      return res.status(200).send({
        success: false,
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
};

export const getFilteredProductsController = async (req, res) => {
  try {
    const { checkbox, radio, sport, start, end } = req.body;
    let args = {};
    console.log("start end", start, end);

    if (checkbox.length > 0) args.category = checkbox;
    if (radio) args.price = { $gte: start, $lte: end };
    if (sport.length > 0) args.sport = sport;

    const products = await productModel
      .find(args)
      .select("-photo")
      .sort({ createdAt: -1 });
    console.log("products", products);
    res.status(200).send({
      success: true,
      message: "Products fetched successfully",
      products,
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

export const getTotalProductsController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    if (total) {
      res.status(200).send({
        success: true,
        total,
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

export const getProductsPerPageController = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page || 1;
    const products = await productModel
      .find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .select("-photo")
      .sort({ createdAt: -1 });

    console.log("products", products);

    if (products) {
      res.status(200).send({
        success: true,
        message: "Products fetched successfully",
        products,
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
