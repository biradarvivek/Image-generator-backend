import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/get", async (req, res) => {
  try {
    const posts = await Post.find({});
    console.log("Posts fetched successfully:", posts);
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
});

router.post("/post", async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    console.log("Photo uploaded to Cloudinary:", photoUrl);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    console.log("New post created:", newPost);
    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    console.error("Error creating post:", err.message);
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
});

export default router;
