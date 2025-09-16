// app/admin/homepage/page.tsx
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function HomePageTab() {
  const [hero, setHero] = useState({
    image: "/alice5.jpg",
    quote: "La memoria è un presente che non finisce mai di passare",
    author: "Octavio Paz",
    ctaLabel: "OPERE",
    ctaHref: "/opere",
    textColor: "white", // white | black
    overlay: "black", // black | white
  });

  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const handleChange = (field: keyof typeof hero, value: string) => {
    setHero((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewFile(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    console.log("Saved hero data:", hero, "Uploaded Image:", previewFile);
    alert("HomePage updated!");
  };

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
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center`}
              style={{
                backgroundColor:
                  hero.overlay === "black"
                    ? "rgba(0,0,0,0.4)"
                    : "rgba(255,255,255,0.4)",
                color: hero.textColor,
              }}
            >
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
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleFileUpload(e.target.files[0])
                }
                className="bg-gray-50 dark:bg-black/40 border-gray-200 dark:border-zinc-700 cursor-pointer"
              />
            </div>

            {/* Quote */}
            <div className="sm:col-span-2">
              <Label>Quote</Label>
              <Textarea
                value={hero.quote}
                onChange={(e) => handleChange("quote", e.target.value)}
                className="bg-gray-50 dark:bg-black/40 border-gray-200 dark:border-zinc-700"
              />
            </div>

            <div>
              <Label>Author</Label>
              <Input
                value={hero.author}
                onChange={(e) => handleChange("author", e.target.value)}
                className="bg-gray-50 dark:bg-black/40 border-gray-200 dark:border-zinc-700"
              />
            </div>

            <div>
              <Label>CTA Label</Label>
              <Input
                value={hero.ctaLabel}
                onChange={(e) => handleChange("ctaLabel", e.target.value)}
                className="bg-gray-50 dark:bg-black/40 border-gray-200 dark:border-zinc-700"
              />
            </div>

            <div className="sm:col-span-2">
              <Label>CTA Link</Label>
              <Input
                value={hero.ctaHref}
                onChange={(e) => handleChange("ctaHref", e.target.value)}
                className="bg-gray-50 dark:bg-black/40 border-gray-200 dark:border-zinc-700"
              />
            </div>

            {/* Text & Overlay Colors */}
            <div>
              <Label>Text Color</Label>
              <select
                value={hero.textColor}
                onChange={(e) => handleChange("textColor", e.target.value)}
                className="w-full rounded-md border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-black/40 px-3 py-2"
              >
                <option value="white">White</option>
                <option value="black">Black</option>
              </select>
            </div>

            <div>
              <Label>Overlay Color</Label>
              <select
                value={hero.overlay}
                onChange={(e) => handleChange("overlay", e.target.value)}
                className="w-full rounded-md border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-black/40 px-3 py-2"
              >
                <option value="black">Dark Overlay</option>
                <option value="white">Light Overlay</option>
              </select>
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
