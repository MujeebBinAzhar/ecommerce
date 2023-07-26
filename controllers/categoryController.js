import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import fs from "fs";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;
    const category = await categoryModel.findOne({ name });
    if (category) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }

    const newCategory = new categoryModel({
      name: name,
      slug: slugify(name),
    });

    if (photo) {
      if (photo.size > 1000000) {
        return res.status(200).send({
          success: true,
          message: "Image size too large",
        });
      }
      newCategory.photo.data = fs.readFileSync(photo.path);
      newCategory.photo.contentType = photo.type;
    }
    await newCategory.save();
    res.status(200).send({
      success: true,
      message: "Category created successfully",
      newCategory,
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

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;

    const category = await categoryModel.findOne({ _id: req.params.id });

    if (category) {
      const updatedCategory = await categoryModel.findOneAndUpdate(
        { _id: req.params.id },
        { name: name, slug: slugify(name) },
        { new: true }

      );
      if (photo) {
        if (photo.size > 1000000) {
          return res.status(200).send({
            success: true,
            message: "Image size too large",
          });
        }
        updatedCategory.photo.data = fs.readFileSync(photo.path);
        updatedCategory.photo.contentType = photo.type;

         res.status(200).send({
          success: true,
          message: "Category updated successfully",
          updatedCategory,
        });
      }

      await updatedCategory.save();
    } else {
      return res.status(200).send({
        success: true,
        message: "Category not found",
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

export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (categories) {
      res.status(200).send({
        success: true,
        message: "Categories fetched successfully",
        categories,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "No categories found",
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

export const getSingleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    if (category) {
      res.status(200).send({
        success: true,
        message: "Category fetched successfully",
        category,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "No category found",
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

 
export const deleteCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ _id: req.params.id });
    if (category) {
      await categoryModel.findOneAndDelete({ _id: req.params.id });
      res.status(200).send({
        success: true,
        message: "Category deleted successfully",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Category not found",
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

export const getCategoryPhotoController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ _id: req.params.id });
    if (category) {
      res.set("Content-Type", category.photo.contentType);
      return res.status(200).send(category.photo.data);
    } else {
      return res.status(200).send({
        success: true,
        message: "Category not found",
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
