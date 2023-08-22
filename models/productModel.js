import mongoose from "mongoose";

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
    //         },
    //       },
    //     ],
    //     quantity: {
    //       type: Number,
    //       default: 0,
    //       required: false,
    //     },
    //   },
    // ],

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
