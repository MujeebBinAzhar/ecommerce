import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
     
  },
  description: {
    type: String,
    required: true,
  },
  details:{
    type:String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },
  
  quantity: {
    type: Number,
    default: 0,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  shipping: {
    type: Boolean,
    
  }
   
},{timestamps:true});

export default mongoose.model("Products", productSchema);
