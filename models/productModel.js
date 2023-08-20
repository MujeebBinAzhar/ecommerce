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
  discount: {
    type: Number,
    default: 0,
    required: false,
  },
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },
  sport: {
    type: mongoose.ObjectId,
    ref: "Sports",
    required: true,
  },
  brand: {
    type: mongoose.ObjectId,
    ref: "Brands",
    required: false,
  },
  // variant: [
  //   {
  //     name: {
  //       type: String,
  //       required: false,

  //     },
  //     attributes: [
  //       {        
  //         name: {
  //           type: String,
  //           required: false,
  //         }
  //       }
        
  //     ],
  //     price: {
  //       type: Number,
  //       default: 0,
  //       required: false,
  //     },
  //     quantity: {
  //       type: Number,
  //       default: 0,
  //       required: false,
  //     },
  //   }
  // ],
  
  quantity: {
    type: Number,
    default: 0,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  photos: [String],
  shipping: {
    type: Boolean,
    
  }
   
},{timestamps:true});

export default mongoose.model("Products", productSchema);
