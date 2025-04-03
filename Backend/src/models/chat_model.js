import mongoose, { Schema } from "mongoose";

const ChatSchema = new Schema(
  {
    jobSeeker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobseekers", // Reference to Jobseekers model
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // Reference to Company model
      required: true,
    },
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "senderType", // Dynamic reference to Jobseekers or Company
          required: true,
        },
        senderType: {
          type: String,
          enum: ["Jobseekers", "Company"], // Model names
          required: true,
        },
        text: { type: String, required: true }, // Message content
        timestamp: { type: Date, default: Date.now }, // Message timestamp
      },
    ],
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", ChatSchema);
