import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Digidecs API running 🚀");
});

app.use("/api/user", userRouter);

export default app;
