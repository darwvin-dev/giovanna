import prisma from "../../lib/prisma.js";

export const createOrUpdateAboutHero = async (req, res) => {
  try {
    const { title, subtitle, overlay } = req.body;
    const page = "about";
    const key = "hero";

    const image = req.file ? `/dynamic-parts/${req.file.filename}` : null;

    const hero = await prisma.dynamicPart.upsert({
      where: { page_key: { page, key } },
      update: {
        title_1: title,
        title_2: subtitle,
        description: overlay ? "true" : "false",
        ...(image && { image_1: image }),
      },
      create: {
        page,
        key,
        title_1: title,
        title_2: subtitle,
        description: overlay ? "true" : "false",
        image_1: image,
      },
    });

    res.json({ status: true, data: hero });
  } catch (err) {
    console.error("❌ Error updating about hero:", err);
    res.status(500).json({ status: false, error: err.message });
  }
};

export const createOrUpdateAboutOverview = async (req, res) => {
  try {
    const { postTitle, postHref, postExcerpt, ctaLabel, paragraphs } = req.body;
    const page = "about";
    const key = "overview";

    const image = req.file ? `/dynamic-parts/${req.file.filename}` : null;

    const overview = await prisma.dynamicPart.upsert({
      where: { page_key: { page, key } },
      update: {
        title_1: postTitle,
        link_1: postHref,
        description: paragraphs,
        link_title_1: ctaLabel,
        ...(image && { image_1: image }),
        title_2: postExcerpt,
      },
      create: {
        page,
        key,
        title_1: postTitle,
        link_1: postHref,
        description: paragraphs,
        link_title_1: ctaLabel,
        image_1: image,
        title_2: postExcerpt,
      },
    });

    res.json({ status: true, data: overview });
  } catch (err) {
    console.error("❌ Error updating about overview:", err);
    res.status(500).json({ status: false, error: err.message });
  }
};

export const createOrUpdateAboutExhibitions = async (req, res) => {
  try {
    const { items } = req.body; 

    const page = "about";
    const key = "exhibitions";

    const exhibitions = await prisma.dynamicPart.upsert({
      where: { page_key: { page, key } },
      update: {
        description: JSON.stringify(items),
      },
      create: {
        page,
        key,
        description: JSON.stringify(items),
      },
    });

    res.json({ status: true, data: exhibitions });
  } catch (err) {
    console.error("❌ Error updating exhibitions:", err);
    res.status(500).json({ status: false, error: err.message });
  }
};
