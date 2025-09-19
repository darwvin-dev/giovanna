import express from "express";
import multer from "multer";
import { createOrUpdateHomeHero, getDynamicPart } from "../controllers/admin/homeController.js";
import { createOrUpdateAboutExhibitions, createOrUpdateAboutHero, createOrUpdateAboutOverview } from "../controllers/admin/AboutController.js";
import { createOrUpdatePortfolioHero } from "../controllers/admin/portolioController.js";

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
router.post("/portolio/hero", upload.single("image"), createOrUpdatePortfolioHero);

router.get("/dynamic-part/:key", getDynamicPart);

router.post("/about/hero", upload.single("image"), createOrUpdateAboutHero);

router.post("/about/overview", upload.single("image"), createOrUpdateAboutOverview);

router.post("/about/exhibitions", createOrUpdateAboutExhibitions);

export default router;
