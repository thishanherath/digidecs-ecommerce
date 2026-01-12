import express from "express";
import cors from "cors";

// import productRouter from "./routes/productRouter.js";
// import userRouter from "./routes/userRouter.js";
// import orderRouter from "./routes/orderRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Digidecs API running 🚀");
});

// app.use("/api/products", productRouter);
// app.use("/api/users", userRouter);
// app.use("/api/orders", orderRouter);

export default app;
