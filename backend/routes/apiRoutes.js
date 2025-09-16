import express from "express";
import prisma from "../lib/prisma.js";
import NodeCache from "node-cache";

const router = express.Router();
const cache = new NodeCache({ stdTTL: 60 });

router.get("/homepage", async (req, res) => {
  try {
    const cachedData = cache.get("homepage_hero");
    if (cachedData) {
      return res.json({ status: true, data: cachedData, cached: true });
    }

    const hero = await prisma.dynamicPart.findUnique({
      where: { page_key: { page: "home", key: "hero" } },
    });

    cache.set("homepage_hero", hero);

    res.json({ status: true, data: hero, cached: false });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
});

export default router;
