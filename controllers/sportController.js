import sportModel from "../models/sportsModel.js";
import slugify from "slugify";
import fs from "fs";

export const createSportController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;
    const sport = await sportModel.findOne({ name });
    if (sport) {
      return res.status(200).send({
        success: true,
        message: "Sport already exists",
      });
    }

    const newSport = new sportModel({
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
      newSport.photo.data = fs.readFileSync(photo.path);
      newSport.photo.contentType = photo.type;
    }
    await newSport.save();
    res.status(200).send({
      success: true,
      message: "Sport created successfully",
      newSport,
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

export const updateSportController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;

    const sport = await sportModel.findOne({ _id: req.params.id });

    if (sport) {
      const updatedSport = await sportModel.findOneAndUpdate(
        { _id: req.params.id },
        { name: name, slug: slugify(name) },
        { new: true }
      );

      if (photo) {
        if (photo.size > 1000000) {
          return res.status(200).send({
            success: false,
            message: "Image size too large",
          });
        }

        updatedSport.photo.data = fs.readFileSync(photo.path);
        updatedSport.photo.contentType = photo.type;
      }

      await updatedSport.save();

      return res.status(200).send({
        success: true,
        message: "Sport updated successfully",
        updatedSport,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Sport not found",
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

export const getAllSportsController = async (req, res) => {
  try {
    const sports = await sportModel.find({});
    if (sports) {
      res.status(200).send({
        success: true,
        message: "Sports fetched successfully",
        sports,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "No sports found",
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

export const getSingleSportController = async (req, res) => {
  try {
    const sport = await sportModel.findOne({ slug: req.params.slug });
    if (sport) {
      res.status(200).send({
        success: true,
        message: "Sport fetched successfully",
        sport,
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

 
export const deleteSportController = async (req, res) => {
  try {
    const sport = await sportModel.findOne({ _id: req.params.id });


    const productsInSport = await productModel.find({ sport: req.params.id });

    if( productsInSport.length > 0){
      return res.status(200).send({
        success: true,
        message: "Sport cannot be deleted as it contains products",
      });
    }

    if (sport) {
      await sportModel.findOneAndDelete({ _id: req.params.id });
      res.status(200).send({
        success: true,
        message: "sport deleted successfully",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Sport not found",
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

export const getSportPhotoController = async (req, res) => {
  try {
    const sport = await sportModel.findOne({ _id: req.params.id });
    if (sport) {
      res.set("Content-Type", sport.photo.contentType);
      return res.status(200).send(sport.photo.data);
    } else {
      return res.status(200).send({
        success: true,
        message: "Sport not found",
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


export const getSportNameController = async (req, res) => {
  try {
       const id=req.params.id;

       const name = await sportModel.findOne({ _id: id }).select('name');
       console.log("name",name);
        if (name) {
          res.status(200).send({
            success: true,
            message: "sport fetched successfully",
            data:name
          });
        }
        else {
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
}