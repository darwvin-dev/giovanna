-- CreateTable
CREATE TABLE "public"."DynamicPart" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title_1" TEXT,
    "title_2" TEXT,
    "image_1" TEXT,
    "image_2" TEXT,
    "description" TEXT,
    "link_title_1" TEXT,
    "link_1" TEXT,
    "link_title_2" TEXT,
    "link_2" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DynamicPart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DynamicPart_page_key_key" ON "public"."DynamicPart"("page", "key");
