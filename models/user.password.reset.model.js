import mongoose from "mongoose";

const passwordResetSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    query: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);
