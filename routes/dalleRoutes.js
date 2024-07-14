import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const HUGGING_FACE_API_URL =
  "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned";
const apiKey = process.env.HUGGING_FACE_API_KEY;

router.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post(
      HUGGING_FACE_API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to generate image");
  }
});

export default router;
