import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    hod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    professors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ]
  },
  { timestamps: true }
);

export const Department = mongoose.model("Department", departmentSchema);
