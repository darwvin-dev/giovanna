import prisma from "../lib/prisma.js";

export const createOrUpdateHomeHero = async (req, res) => {
  try {
    const { quote, author, link_title_1, link_1, link_title_2, link_2 } =
      req.body;

    const page = "home";
    const key = "hero";

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const heroSection = await prisma.dynamicPart.upsert({
      where: { page_key: { page, key } },
      update: {
        title_1: quote,
        title_2: author,
        image_1: image,
        link_title_1,
        link_1,
        link_title_2,
        link_2,
      },
      create: {
        page,
        key,
        title_1: quote,
        title_2: author,
        image_1: image,
        link_title_1,
        link_1,
        link_title_2,
        link_2,
      },
    });

    res.json({
      status: true,
      message: "Hero section updated successfully",
      data: heroSection,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: err.message });
  }
};

export const getDynamicPart = async (req, res) => {
  try {
    const { key } = req.params;

    const dynamicPart = await prisma.dynamicPart.findUnique({
      where: {
        page_key: {
          key,
        },
      },
    });

    if (!dynamicPart) {
      return res.status(404).json({
        status: false,
        message: "Dynamic part not found",
      });
    }

    res.json({
      status: true,
      data: dynamicPart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};
