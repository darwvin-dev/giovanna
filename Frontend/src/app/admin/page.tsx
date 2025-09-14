// app/admin/homepage/page.tsx
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function HomePageTab() {
  const [hero, setHero] = useState({
    image: "/alice5.jpg",
    quote: "La memoria è un presente che non finisce mai di passare",
    author: "Octavio Paz",
    ctaLabel: "OPERE",
    ctaHref: "/opere",
  });

  const handleChange = (field: keyof typeof hero, value: string) => {
    setHero((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saved hero data:", hero);
    alert("HomePage updated!");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Homepage Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Preview */}
          <div className="relative w-full h-56 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700">
            <img
              src={hero.image}
              alt="Hero Preview"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-xl">
              Preview
            </div>
          </div>

          {/* Form */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>Background Image (URL)</Label>
              <Input
                value={hero.image}
                onChange={(e) => handleChange("image", e.target.value)}
                className="bg-gray-50 dark:bg-black/40 border-gray-200 dark:border-zinc-700"
              />
            </div>

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
          </div>

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
