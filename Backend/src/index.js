import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URL;

if (!MONGO_URI) {
  console.error("❌ MONGODB_URL missing");
  process.exit(1);
}

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
