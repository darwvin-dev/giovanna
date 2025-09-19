import prisma from "../../lib/prisma.js";

export const createOrUpdatePortfolioHero = async (req, res) => {
  try {
    const page = "portfolio";
    const key = "hero";

    const image = req.file ? `/dynamic-parts/${req.file.filename}` : null;

    const heroSection = await prisma.dynamicPart.upsert({
      where: { page_key: { page, key } },
      update: {
        ...(image && { image_1: image }),
      },
      create: {
        page,
        key,
        image_1: image,
      },
    });

    res.json({
      status: true,
      message: "✅ Hero section updated successfully",
      data: heroSection,
    });
  } catch (err) {
    console.error("❌ Error updating hero:", err);
    res.status(500).json({ status: false, error: err.message });
  }
};
