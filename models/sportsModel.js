import mongoose from "mongoose";

const sportsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  photo: {
    data: Buffer,
    contentType: String,
  },
  slug: { type: String, lowercase: true },

  parentId: { type: String },
});

export default mongoose.model("Sports", sportsSchema);
