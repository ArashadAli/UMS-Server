import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
    },

    files: [
      {
        type: String,
      }
    ],

    assignedProfessor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    hod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["pending", "professor-approved", "hod-approved", "rejected"],
      default: "pending"
    },

    professorRemark: {
      type: String,
      default: ""
    },

    hodRemark: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export const Assignment = mongoose.model("Assignment", assignmentSchema);
