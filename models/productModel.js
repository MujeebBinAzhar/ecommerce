import mongoose from "mongoose";


const variantSchema = new mongoose.Schema({
  name: mongoose.Schema.Types.Mixed, // Allow mixed data type (string or number)
  quantity: Number, // Numeric quantity
});

const productSchema = new mongoose.Schema(
  {
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
    details: {
      type: String,
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

    trending: {
      type: Boolean,
      default: false,
      required: false,
    },
    popular: {
      type: Boolean,
      default: false,
      required: false,
    },
    isnew: {
      type: Boolean,
      default: false,
      required: false,
    },
    featured: {
      type: Boolean,
      default: false,
      required: false,
    },

    variants: [
      {
        name: mongoose.Schema.Types.Mixed,  
        attributes: [variantSchema],  
      },
    ],

    discount: {
      type: Number,
      default: 0,
      required: false,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
    photos: [String],
    features: {
      type: [String],
      required: false,
    },
    shipping: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
