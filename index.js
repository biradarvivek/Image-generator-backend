import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    // origin: "http://localhost:5173", // adjust this for your production URL
    origin: "https://image-generator-lexica.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("hello from DALL-E");
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server started"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
