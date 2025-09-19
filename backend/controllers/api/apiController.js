import prisma from "../../lib/prisma.js";

export const getAboutData = async (req, res) => {
  try {
    const hero = await prisma.dynamicPart.findUnique({
      where: { page_key: { page: "about", key: "hero" } },
    });

    const overview = await prisma.dynamicPart.findUnique({
      where: { page_key: { page: "about", key: "overview" } },
    });

    const exhibitions = await prisma.dynamicPart.findUnique({
      where: { page_key: { page: "about", key: "exhibitions" } },
    });

    res.json({
      status: true,
      data: { hero, overview, exhibitions },
    });
  } catch (err) {
    console.error("❌ Error fetching about data:", err);
    res.status(500).json({ status: false, error: err.message });
  }
};
