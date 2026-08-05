import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address"
      ]
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false // NEVER return password by default
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer"
    },

    isBlocked: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    },

    img: {
      type: String,
      default:
        "https://img.icons8.com/?size=100&id=ScJCfhkd77yD&format=png&color=000000"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);