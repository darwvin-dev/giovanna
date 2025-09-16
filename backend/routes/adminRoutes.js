import express from "express";
import multer from "multer";
import { createOrUpdateHomeHero, getDynamicPart } from "../controllers/adminController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/dynamic-parts"); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/homepage/hero", upload.single("image"), createOrUpdateHomeHero);

router.get("/dynamic-part/:key", getDynamicPart);

export default router;
