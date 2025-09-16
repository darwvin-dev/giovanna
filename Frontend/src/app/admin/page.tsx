"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type HeroData = {
  image: string;
  quote: string;
  author: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function HomePageTab() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const handleChange = (field: keyof HeroData, value: string) => {
    setHero((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewFile(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!hero) return;

    try {
      const formData = new FormData();
      formData.append("quote", hero.quote || "");
      formData.append("author", hero.author || "");
      formData.append("ctaLabel", hero.ctaLabel || "");
      formData.append("ctaHref", hero.ctaHref || "");

      if (
        previewFile &&
        (document.querySelector("#imageInput") as HTMLInputElement)?.files?.[0]
      ) {
        const file = (document.querySelector("#imageInput") as HTMLInputElement)
          .files![0];
        formData.append("image", file);
      }

      const res = await fetch("http://localhost:5000/api/admin/homepage/hero", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.status) {
        alert("✅ HomePage updated successfully!");
      } else {
        alert("❌ Update failed: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error saving homepage");
    }
  };

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/homepage");
      const data = await res.json();

      if (data.status && data.data) {
        const d = data.data;
        setHero({
          quote: d.title_1 || "",
          author: d.title_2 || "",
          image: d.image_1 || "",
          ctaLabel: d.link_title_1 || "",
          ctaHref: d.link_1 || "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!hero) getData();
  }, []);

  if (!hero) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Homepage Hero Section
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Preview */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700">
            <img
              src={previewFile || hero.image}
              alt="Hero Preview"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <blockquote className="mb-3 text-lg md:text-2xl italic leading-snug">
                {hero.quote}
              </blockquote>
              <p className="mb-4 text-sm uppercase tracking-wide">
                {hero.author}
              </p>
              <Button className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold px-6">
                {hero.ctaLabel}
              </Button>
            </div>
          </div>

          {/* Form */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>Upload Image</Label>
              <Input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleFileUpload(e.target.files[0])
                }
              />
            </div>

            <div className="sm:col-span-2">
              <Label>Quote</Label>
              <Textarea
                value={hero.quote}
                onChange={(e) => handleChange("quote", e.target.value)}
              />
            </div>

            <div>
              <Label>Author</Label>
              <Input
                value={hero.author}
                onChange={(e) => handleChange("author", e.target.value)}
              />
            </div>

            <div>
              <Label>CTA Label</Label>
              <Input
                value={hero.ctaLabel}
                onChange={(e) => handleChange("ctaLabel", e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <Label>CTA Link</Label>
              <Input
                value={hero.ctaHref}
                onChange={(e) => handleChange("ctaHref", e.target.value)}
              />
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold px-6"
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
