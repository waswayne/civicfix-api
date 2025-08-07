import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Issue title is reqiured"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, " Description is required"],
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["open", "in progress", "resolved"],
      default: "open",
    },

    location: {
      type: String,
      trim: true,
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);
