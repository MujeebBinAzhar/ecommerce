import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  
  slug: { type: String, lowercase: true },
  parentId: { type: String },
});

export default mongoose.model("Brands", brandSchema);
